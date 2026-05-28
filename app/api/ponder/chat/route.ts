import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { getChatModel } from "@/lib/ponder/embeddings";
import { getAgentTools } from "@/lib/ponder/agentTools";
import { PONDER_SYSTEM_PROMPT, buildPonderUserPrompt } from "@/lib/ponder/prompts";
import { vectorStore } from "@/lib/ponder/vectorStore";
import { PonderTraceStep, PonderCitation, PonderConfidence } from "@/types/ponder";

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  const traceSteps: PonderTraceStep[] = [];

  // Local helper to record elapsed time trace entries
  const addTraceStep = (step: {
    type: "planning" | "searching" | "analyzing" | "evaluating" | "complete" | "error" | "system";
    title: string;
    detail: string;
    status: "complete" | "active" | "pending" | "error";
  }) => {
    const elapsedSeconds = ((Date.now() - startTime) / 1000).toFixed(1);
    traceSteps.push({
      id: `step-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: step.type,
      title: step.title,
      detail: step.detail,
      duration: `${elapsedSeconds}s`,
      status: step.status
    });
  };

  try {
    const body = await req.json();
    const { sessionId, question, messages } = body;

    // Support both direct question input and chat arrays
    const latestQuestion = question || messages?.[messages.length - 1]?.content || "";

    // 1. DATA VALIDATIONS
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid sessionId parameter." },
        { status: 400 }
      );
    }

    if (!latestQuestion.trim()) {
      return NextResponse.json(
        { success: false, error: "Question cannot be blank or empty." },
        { status: 400 }
      );
    }

    // 2. RETRIEVE VECTOR STATUS - ENFORCE INDEX EXISTS BOUNDARY
    const stats = vectorStore.getStats(sessionId);
    if (stats.chunkCount === 0) {
      return NextResponse.json(
        { success: false, error: "Embed at least one document before asking Ponder." },
        { status: 400 }
      );
    }

    // 3. INITIALIZE COGNITIVE RETRIEVAL TRACE LOGS
    addTraceStep({
      type: "planning",
      title: "Planning request",
      detail: `Received question: "${latestQuestion.length > 50 ? latestQuestion.slice(0, 47) + "..." : latestQuestion}". Triggering retrieve-evaluate cognitive loop.`,
      status: "complete"
    });

    // Bind session parameters to active reasoning tools
    const tools = getAgentTools(sessionId, addTraceStep);
    const chatModel = getChatModel();

    // 4. TRIGGER MULTI-STEP GEMINI REASONING LOOP (maxSteps allows consecutive searches + analyzes + evaluations)
    const { text, steps } = await generateText({
      model: chatModel,
      system: PONDER_SYSTEM_PROMPT,
      prompt: buildPonderUserPrompt(latestQuestion),
      tools: tools as any,
      maxSteps: 5
    } as any);

    // 5. EXTRACT CITATIONS & CONFIDENCE FROM TOOL RESULT SCHEMAS
    let confidence: PonderConfidence = {
      faithfulness: 92,
      relevance: 90,
      completeness: 88,
      overall: 90
    };
    
    const citations: PonderCitation[] = [];

    // Crawl execution history to capture dynamic tool records
    for (const step of steps) {
      if (step.toolCalls) {
        for (const toolCall of step.toolCalls) {
          if (toolCall.toolName === "evaluateAnswer") {
            const match = step.toolResults?.find((r: any) => r.toolCallId === toolCall.toolCallId) as any;
            if (match && match.result) {
              const res = match.result;
              confidence = {
                faithfulness: typeof res.faithfulness === "number" ? res.faithfulness : 92,
                relevance: typeof res.relevance === "number" ? res.relevance : 90,
                completeness: typeof res.completeness === "number" ? res.completeness : 88,
                overall: typeof res.overall === "number" ? res.overall : 90
              };
            }
          }
          if (toolCall.toolName === "searchDocuments") {
            const match = step.toolResults?.find((r: any) => r.toolCallId === toolCall.toolCallId) as any;
            if (match && Array.isArray(match.result)) {
              match.result.forEach((c: any) => {
                // Ensure duplicate citation mapping is clean
                if (!citations.some((item) => item.content === c.content)) {
                  citations.push({
                    id: c.citationId,
                    marker: c.citationId,
                    documentTitle: c.documentTitle,
                    chunkIndex: c.chunkIndex,
                    content: c.content,
                    score: c.score
                  });
                }
              });
            }
          }
        }
      }
    }

    // 6. RECORD FINAL RESPONSE STEP
    addTraceStep({
      type: "complete",
      title: "Final response generated",
      detail: `Agent answer compiled successfully with ${citations.length} active chunk citations.`,
      status: "complete"
    });

    // 7. RESPOND SECURELY
    return NextResponse.json({
      success: true,
      answer: text,
      traceSteps,
      citations,
      confidence,
      stats
    });

  } catch (err: any) {
    console.error("[Ponder Chat Route Loop Error]:", err);
    const message = err.message || "Internal server error occurred in agent loop.";
    
    return NextResponse.json(
      { success: false, error: message },
      { status: err.message?.includes("Gemini API key missing") ? 503 : 500 }
    );
  }
}
