import { NextRequest, NextResponse } from "next/server";
import { chunkDocument } from "@/lib/ponder/rag";
import { embedChunkTexts } from "@/lib/ponder/embeddings";
import { vectorStore } from "@/lib/ponder/vectorStore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, document } = body;

    // 1. DATA VALIDATIONS
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { success: false, error: "Missing or invalid sessionId." },
        { status: 400 }
      );
    }

    if (!document || !document.id || !document.title || !document.content) {
      return NextResponse.json(
        { success: false, error: "Document payload is incomplete or invalid." },
        { status: 400 }
      );
    }

    const { id, title, content } = document;

    // Enforce strict limit boundary (50,000 characters)
    if (content.length > 50000) {
      return NextResponse.json(
        { success: false, error: "Ingestion rejected: Document content exceeds 50,000 character limits." },
        { status: 400 }
      );
    }

    // 2. PARSE AND CHUNK SERVER-SIDE (Zero-trust client model)
    const serverChunks = chunkDocument(id, title, content);
    if (serverChunks.length === 0) {
      return NextResponse.json(
        { success: false, error: "RAG Error: Document produced zero valid sentence chunks." },
        { status: 400 }
      );
    }

    // 3. EXECUTE BATCH EMBEDDINGS (using embedMany under the hood)
    const chunkTexts = serverChunks.map((chunk) => chunk.content);
    const embeddings = await embedChunkTexts(chunkTexts);

    // 4. STORAGE REGISTRATION
    vectorStore.addChunks(sessionId, id, title, serverChunks, embeddings);
    const updatedStats = vectorStore.getStats(sessionId);

    // 5. SECURE OUTPUT RESPONSE
    return NextResponse.json({
      success: true,
      documentId: id,
      title,
      chunkCount: serverChunks.length,
      embeddedChunkCount: embeddings.length,
      stats: updatedStats
    });

  } catch (err: any) {
    console.error("[Ponder Embed Endpoint Error]:", err);
    
    // Provide clean, structured recruiter-friendly error feedback
    const message = err.message || "Internal server error occurred during vectorization.";
    return NextResponse.json(
      { success: false, error: message },
      { status: err.message?.includes("Gemini API key missing") ? 503 : 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const documentId = searchParams.get("documentId");

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Missing sessionId query parameter." },
        { status: 400 }
      );
    }

    if (documentId) {
      vectorStore.removeByDocument(sessionId, documentId);
    } else {
      vectorStore.removeBySession(sessionId);
    }
    const updatedStats = vectorStore.getStats(sessionId);

    return NextResponse.json({
      success: true,
      stats: updatedStats
    });
  } catch (err: any) {
    console.error("[Ponder Embed DELETE Error]:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Failed to remove document chunks from vector store." },
      { status: 500 }
    );
  }
}
