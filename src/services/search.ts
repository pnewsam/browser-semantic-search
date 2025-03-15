import embeddingService from "./embedding";

export function cosineSimilarity(vector1: number[], vector2: number[]) {
  let dotProduct = 0;
  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
  }
  return dotProduct;
}

export function generateItemEmbeddings(items: any[], vocabulary: string[]) {
  return items.map((item) => {
    const combinedText = `${item.title} ${item.content}`;
    const embedding = embeddingService.createEmbedding(
      combinedText,
      vocabulary
    );
    return { ...item, embedding };
  });
}
