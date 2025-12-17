import { JobInfoTable } from "@/drizzle/schema"
import { groq } from "../models/groq"
import { streamText } from "ai"
import * as mammoth from "mammoth"
// @ts-ignore
import PDFParser from "pdf2json"

export async function analyzeResume({
  resumeFile,
  jobInfo,
}: {
  resumeFile: File
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "title" | "experienceLevel" | "description"
  >
}) {
  console.log("Starting resume analysis with streamText (Groq Llama 3.3)...")
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
    // Fallback for unsupported types (like .doc if it got through)
    throw new Error("Unsupported file type for analysis")
  }

  return streamText({
    model: groq("llama-3.3-70b-versatile"),
    messages: [
      {
        role: "user",
        content: `Here is the resume content:\n\n${resumeText}`,
      },
    ],
    system: `You are an expert resume reviewer and hiring advisor.

You will receive a candidate's resume content as text in the user prompt. This resume is being used to apply for a job with the following information:

Job Description:
\`\`\`
${jobInfo.description}
\`\`\`
Experience Level: ${jobInfo.experienceLevel}
${jobInfo.title ? `\nJob Title: ${jobInfo.title}` : ""}

Your task is to evaluate the resume against the job requirements and provide structured feedback.

Return the response in the following JSON format ONLY. Do not use markdown code blocks (e.g. \`\`\`json). Just return the raw JSON object.

{
  "overallScore": number, // Overall score from 0-10
  "ats": {
    "score": number, // 0-10
    "summary": "Short summary of ATS analysis",
    "feedback": [
      {
        "type": "strength" | "minor-improvement" | "major-improvement",
        "name": "Feedback label",
        "message": "Specific feedback message"
      }
    ]
  },
  "jobMatch": {
    "score": number, // 0-10
    "summary": "Short summary of job match analysis",
    "feedback": [...]
  },
  "writingAndFormatting": {
    "score": number, // 0-10
    "summary": "Short summary",
    "feedback": [...]
  },
  "keywordCoverage": {
    "score": number, // 0-10
    "summary": "Short summary",
    "feedback": [...]
  },
  "other": {
    "score": number, // 0-10
    "summary": "Short summary",
    "feedback": [...]
  }
}

Categories to analyze:
1. **ats** - Analysis of how well the resume matches ATS (Applicant Tracking System) requirements.
   - Consider layout simplicity, use of standard section headings, avoidance of graphics or columns, consistent formatting, etc.

2. **jobMatch** - Analysis of how well the resume aligns with the job description and experience level.
   - Assess skills, technologies, achievements, and relevance.

3. **writingAndFormatting** - Analysis of the writing quality, tone, grammar, clarity, and formatting.
   - Comment on structure, readability, section organization, and consistency.
   - Be sure to consider the wording and formatting of the job description when evaluating the resume so you can recommend specific wording or formatting changes that would improve the resume's alignment with the job requirements.

4. **keywordCoverage** - Analysis of how well the resume includes keywords or terminology from the job description.
   - Highlight missing or well-used terms that might help with ATS matching and recruiter readability.
   - Be sure to consider the keywords used in the job description when evaluating the resume so you can recommend specific keywords that would improve the resume's alignment with the job requirements.

5. **other** - Any other relevant feedback not captured above.
   - This may include things like missing contact info, outdated technologies, major red flags, or career gaps.

Guidelines:
- Tailor your analysis and feedback to the specific job description and experience level provided.
- Be clear, constructive, and actionable. The goal is to help the candidate improve their resume so it is ok to be critical.
- Refer to the candidate as "you" in your feedback.
- Stop generating output as soon you have provided the full JSON.
`,
  })
}

