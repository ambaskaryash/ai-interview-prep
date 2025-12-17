import { JobInfoTable } from "@/drizzle/schema"
import { groq } from "../models/groq"
import { streamText } from "ai"
import * as mammoth from "mammoth"
// @ts-ignore
import PDFParser from "pdf2json"

export async function generateCoverLetter({
  resumeFile,
  jobInfo,
  onFinish,
}: {
  resumeFile: File
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "title" | "experienceLevel" | "description"
  >
  onFinish?: (text: string) => Promise<void>
}) {
  console.log("Starting cover letter generation...")
  const buffer = Buffer.from(await resumeFile.arrayBuffer())
  let resumeText = ""

  if (resumeFile.type === "application/pdf") {
    const pdfParser = new PDFParser(null, true)
    resumeText = await new Promise<string>((resolve, reject) => {
      pdfParser.on("pdfParser_dataError", (errData: any) =>
        reject(errData.parserError)
      )
      pdfParser.on("pdfParser_dataReady", () => {
        resolve(pdfParser.getRawTextContent())
      })
      pdfParser.parseBuffer(buffer)
    })
  } else if (
    resumeFile.type ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const { value } = await mammoth.extractRawText({ buffer })
    resumeText = value
  } else if (resumeFile.type === "text/plain") {
    resumeText = buffer.toString("utf-8")
  } else {
    throw new Error("Unsupported file type")
  }

  return streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      {
        role: "user",
        content: `Here is the resume content:\n\n${resumeText}`,
      },
    ],
    system: `You are an expert career coach and professional writer.

You will receive a candidate's resume content.
Job Description:
\`\`\`
${jobInfo.description}
\`\`\`
Experience Level: ${jobInfo.experienceLevel}
${jobInfo.title ? `Job Title: ${jobInfo.title}` : ""}

Your task is to write a highly compelling, professional cover letter for this candidate applying to this job.
- Connect the candidate's specific achievements to the job requirements.
- Use a professional but engaging tone.
- Format it properly as a letter.
- Keep it concise (under 400 words).

Return ONLY the cover letter text in Markdown format. Do not include any "Here is your cover letter" preamble.`,
    onFinish: async ({ text }) => {
      if (onFinish) await onFinish(text)
    },
  })
}
