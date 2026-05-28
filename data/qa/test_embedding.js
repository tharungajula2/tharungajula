async function run() {
  try {
    const { createGoogleGenerativeAI } = await import("@ai-sdk/google");
    const { embed } = await import("ai");
    
    const apiKey = "AIzaSyDwuRv2NYdf7k6GghGbW21G5GcOjaFpGD8";
    const google = createGoogleGenerativeAI({ apiKey });
    
    const model = google.textEmbeddingModel("gemini-embedding-2");
    
    console.log("Calling embedding model 'gemini-embedding-2'...");
    const { embedding } = await embed({
      model,
      value: "hello world"
    });
    console.log("Success! Embedding length:", embedding.length);
  } catch (err) {
    console.error("Embedding error:", err);
  }
}
run();
