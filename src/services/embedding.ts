function EmbeddingService() {
  let embeddings: any[] = [];

  function tokenize(text: string) {
    return text
      .toLowerCase()
      .split(/\W+/)
      .filter((token) => token.length > 0);
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

  function createEmbedding(text: string, vocabulary: string[]) {
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

    console.log({ magnitude });
    return magnitude === 0 ? vector : vector.map((val) => val / magnitude);
  }

  return { tokenize, createVocabulary, createEmbedding, embeddings };
}

const embeddingService = EmbeddingService();
export default embeddingService;
