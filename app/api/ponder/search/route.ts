import { NextRequest, NextResponse } from "next/server";
import { embedText } from "@/lib/ponder/embeddings";
import { vectorStore } from "@/lib/ponder/vectorStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, query, maxResults = 5 } = body;

    // 1. DATA VALIDATIONS
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid sessionId." },
        { status: 400 }
      );
    }

    if (!query || typeof query !== "string" || !query.trim()) {
      return NextResponse.json(
        { success: false, error: "Query query string is empty or invalid." },
        { status: 400 }
      );
    }

    // 2. VECTORIZE QUERY TEXT
    let queryEmbedding: number[];
    try {
      queryEmbedding = await embedText(query);
    } catch (err: any) {
      console.error("[Ponder Embed Query Error]:", err);
      return NextResponse.json(
        { success: false, error: err.message || "Failed to embed the query search string." },
        { status: 503 }
      );
    }

    // 3. SEMANTIC CORES RETRIEVAL
    const results = vectorStore.search(sessionId, queryEmbedding, maxResults);
    const updatedStats = vectorStore.getStats(sessionId);

    // 4. RESPOND WITH ORDERED EVIDENCE MATCHES
    return NextResponse.json({
      success: true,
      query,
      results,
      stats: updatedStats
    });

  } catch (err: any) {
    console.error("[Ponder Search Endpoint Error]:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error occurred during vector retrieval." },
      { status: 500 }
    );
  }
}
