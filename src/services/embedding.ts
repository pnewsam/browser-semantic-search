function EmbeddingService() {
  let embeddings: Map<string, number[]> = new Map();
  let vocabulary: string[] = [];

  function initialize(items: any[]) {
    vocabulary = createVocabulary(items);
    embeddings = generateEmbeddings(items);
  }

  function tokenize(text: string) {
    return text
      .toLowerCase()
      .split(/\W+/)
      .filter((token) => token.length > 0);
  }

  function generateEmbeddings(items: any[]) {
    items.forEach((item) => {
      const text = `${item.title} ${item.content}`;
      const embedding = createEmbedding(text);
      embeddings.set(item.id, embedding);
    });

    return embeddings;
  }

  function createVocabulary(items: any[]) {
    const tokens = new Set();
    items.forEach((item) => {
      const titleTokens = tokenize(item.title);
      const contentTokens = tokenize(item.content);
      [...titleTokens, ...contentTokens].forEach((token) => tokens.add(token));
    });
    return Array.from(tokens) as string[];
  }

  function createEmbedding(text: string) {
    const tokens = tokenize(text);
    const vector = new Array(vocabulary.length).fill(0);

    tokens.forEach((token) => {
      const index = vocabulary.indexOf(token);
      if (index !== -1) {
        vector[index]++;
      }
    });

    const magnitude = Math.sqrt(
      vector.reduce((sum, val) => sum + val * val, 0)
    );

    return magnitude === 0 ? vector : vector.map((val) => val / magnitude);
  }

  function cosineSimilarity(vector1: number[], vector2: number[]) {
    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
    }
    return dotProduct;
  }

  function search(query: string, items: any[]) {
    const queryEmbedding = createEmbedding(query);
    const results = items.map((item) => {
      const embedding = embeddings.get(item.id);
      const similarity = cosineSimilarity(queryEmbedding, embedding || []);
      return { ...item, similarity };
    });

    return results
      .filter((item) => item.similarity > 0.1)
      .sort((a, b) => b.similarity - a.similarity);
  }

  return {
    embeddings,
    initialize,
    similarity: cosineSimilarity,
    search,
  };
}

const embeddingService = EmbeddingService();
export { embeddingService };
