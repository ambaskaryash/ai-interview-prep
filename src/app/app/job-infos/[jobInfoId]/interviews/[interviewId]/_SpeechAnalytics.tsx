"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReturnChatEvent } from "hume/api/resources/empathicVoice"
import { useMemo } from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const FILLER_WORDS = ["um", "ah", "like", "you know", "uh", "hmm"]

export function SpeechAnalytics({ messages }: { messages: ReturnChatEvent[] }) {
  const analytics = useMemo(() => {
    const userMessages = messages.filter(
      (m) => m.type === "USER_MESSAGE" && m.messageText != null
    )

    // 1. Filler Words
    const fillers: Record<string, number> = {}
    FILLER_WORDS.forEach((word) => (fillers[word] = 0))
    let totalFillers = 0

    // 2. Pace & Confidence
    let totalWords = 0
    let totalDurationSeconds = 0
    const timeSeriesData: {
      timestamp: number
      wpm: number
      confidence: number
      message: string
    }[] = []

    userMessages.forEach((msg, index) => {
      const text = msg.messageText || ""
      
      // Count fillers
      const lowerText = text.toLowerCase()
      FILLER_WORDS.forEach((word) => {
        // Regex for whole word matching to avoid partial matches (e.g. "like" in "likely")
        const regex = new RegExp(`\\b${word}\\b`, "gi")
        const count = (lowerText.match(regex) || []).length
        fillers[word] += count
        totalFillers += count
      })

      // Calculate WPM and Confidence
      // Estimate duration based on timestamp difference with next message
      // Note: This includes system latency, so it's an approximation.
      // Hume's ReturnChatEvent timestamp is in seconds.
      const nextMsg = messages[messages.indexOf(msg) + 1]
      const duration = nextMsg && nextMsg.timestamp && msg.timestamp 
        ? nextMsg.timestamp - msg.timestamp
        : 0
      
      if (duration > 0 && duration < 60) { // Filter out long pauses/errors
        const wordCount = text.split(/\s+/).length
        const wpm = Math.round((wordCount / duration) * 60)
        totalWords += wordCount
        totalDurationSeconds += duration

        // Calculate Confidence
        let emotions: Record<string, number> = {}
        try {
          if (typeof msg.emotionFeatures === 'string') {
            const parsed = JSON.parse(msg.emotionFeatures)
            emotions = parsed.emotion || {}
          } else if (typeof msg.emotionFeatures === 'object') {
            // @ts-expect-error - handling potential object type
            emotions = msg.emotionFeatures?.emotion || msg.emotionFeatures || {}
          }
        } catch (e) {
          console.error("Failed to parse emotionFeatures", e)
        }
        
        // Simple confidence proxy: (Confidence + Determination) - (Anxiety + Confusion)
        // Normalized to 0-100 scale. 
        // Assuming raw scores are 0-1 (Hume usually returns probability)
        const getScore = (name: string) => Number(emotions[name] || 0)
        
        const positive = 
          getScore("Determination") + 
          getScore("Calmness") + 
          getScore("Satisfaction") + 
          getScore("Triumph") + 
          getScore("Confidence") 

        const negative = 
          getScore("Anxiety") + 
          getScore("Awkwardness") + 
          getScore("Confusion") + 
          getScore("Doubt") + 
          getScore("Distress")

        // Score from -1 to 1 roughly (sum of probs might > 1 but we compare relative)
        // Let's normalize: score = (pos - neg + 1) / 2 * 100
        // Or simpler: Confidence metric if available directly.
        // Let's use a composite score.
        const total = positive + negative
        const confidenceScore = total > 0 ? Math.round((positive / total) * 100) : 50

        timeSeriesData.push({
          timestamp: index + 1, // Using message index as time proxy for simplicity
          wpm,
          confidence: confidenceScore,
          message: text.slice(0, 50) + "..."
        })
      }
    })

    const avgWpm = totalDurationSeconds > 0 
      ? Math.round((totalWords / totalDurationSeconds) * 60) 
      : 0

    return {
      fillers,
      totalFillers,
      avgWpm,
      timeSeriesData
    }
  }, [messages])

  if (analytics.timeSeriesData.length === 0) return null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pace Tracker */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Speaking Pace</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.avgWpm} WPM</div>
            <p className="text-xs text-muted-foreground mt-1">
              {analytics.avgWpm < 110 
                ? "Too slow" 
                : analytics.avgWpm > 160 
                ? "Too fast" 
                : "Optimal pace (110-160 WPM)"}
            </p>
          </CardContent>
        </Card>

        {/* Filler Words */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Filler Words</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalFillers}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {Object.entries(analytics.fillers)
                .filter(([_, count]) => count > 0)
                .sort((a, b) => b[1] - a[1])
                .map(([word, count]) => (
                  <span key={word} className="text-xs bg-secondary px-2 py-1 rounded-full">
                    {word}: {count}
                  </span>
                ))}
              {analytics.totalFillers === 0 && (
                <span className="text-xs text-muted-foreground">None detected!</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Average Confidence */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                analytics.timeSeriesData.reduce((acc, curr) => acc + curr.confidence, 0) / 
                analytics.timeSeriesData.length
              )}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on vocal tone analysis
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Confidence Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Confidence & Pace Timeline</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={analytics.timeSeriesData}>
              <defs>
                <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="timestamp" 
                label={{ value: 'Response #', position: 'insideBottom', offset: -5 }} 
              />
              <YAxis domain={[0, 100]} />
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg text-sm">
                        <p className="font-medium mb-2">Response #{data.timestamp}</p>
                        <p className="text-muted-foreground italic mb-2">"{data.message}"</p>
                        <div className="space-y-1">
                          <p className="text-primary">Confidence: {data.confidence}%</p>
                          <p className="text-muted-foreground">Pace: {data.wpm} WPM</p>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area 
                type="monotone" 
                dataKey="confidence" 
                stroke="#8884d8" 
                fillOpacity={1} 
                fill="url(#colorConfidence)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
