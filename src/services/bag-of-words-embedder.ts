/**
 * BagOfWordsEmbedder is a service that embeds entities into a vector space.
 * @param stringify - A function that converts an entity into a string.
 * @param entities - An array of entities to embed.
 * @returns An object with the following properties:
 * - embeddings: A map of entity ids to their embeddings.
 * - vectorize: A function that converts a string into a vector.
 * - similarity: A function that calculates the similarity between two embeddings.
 * - search: A function that searches for entities by query.
 */
function BagOfWordsEmbedder<
  Entity extends {
    id: string;
  }
>({
  stringify,
  entities,
}: {
  stringify: (entity: Entity) => string;
  entities: Entity[];
}) {
  let vocabulary: string[] = [];
  let embeddings: Map<string, number[]> = new Map();

  const tokenize = (text: string) =>
    text.toLowerCase().split(/\W+/).filter(Boolean);

  /**
   * The magnitude or "Euclidean norm" represents the straight-line distance
   * from the origin to the point represented by the vector.
   */
  const magnitude = (vector: number[]) => {
    const sum = vector.reduce((sum, val) => {
      const square = val * val;
      return sum + square;
    }, 0);
    return Math.sqrt(sum);
  };

  /**
   * Normalizing a vector scales it to have a magnitude of 1, which is important
   * for cosine similarity calculations.
   */
  const normalize = (vector: number[]) => {
    const mag = magnitude(vector);
    if (mag === 0) return vector;
    return vector.map((val) => val / mag);
  };

  /**
   * Vectorizing a string converts it into a vector of normalized word frequencies.
   */
  function vectorize(text: string) {
    const tokens = tokenize(text);
    const frequencies = new Array(vocabulary.length).fill(0);

    tokens.forEach((token) => {
      const index = vocabulary.indexOf(token);
      if (index !== -1) {
        frequencies[index]++;
      }
    });

    return normalize(frequencies);
  }

  /**
   * The dot product or scalar product is a measure of how similar two vectors are.
   * Visually, it's "how much do these vectors point in the same direction?"
   */
  const similarity = (vector1: number[], vector2: number[]) => {
    let dotProduct = 0;
    for (let i = 0; i < vector1.length; i++) {
      dotProduct += vector1[i] * vector2[i];
    }
    return dotProduct;
  };

  /**
   * Initializes the embeddings.
   * This initializes the embeddings and vocabulary.
   */
  const initialize = () => {
    // Create vocabulary
    const words = new Set();
    entities.forEach((entity) => {
      const text = stringify(entity);
      // Tokenize the text and add the tokens to the set.
      const tokens = tokenize(text);
      tokens.forEach((token) => words.add(token));
    });
    vocabulary = Array.from(words) as string[];

    // Vectorize each entity and add the embedding to the map.
    entities.forEach((entity) => {
      const text = stringify(entity);
      const embedding = vectorize(text);
      embeddings.set(entity.id, embedding);
    });
  };

  /**
   * Searches for entities by query.
   * This searches for entities by query.
   */
  const search = (query: string, items: any[]) => {
    const queryEmbedding = vectorize(query);
    const results = items.map((item) => {
      const embedding = embeddings.get(item.id);
      return {
        ...item,
        similarity: similarity(queryEmbedding, embedding || []),
      };
    });

    return results
      .filter((item) => item.similarity > 0.1)
      .sort((a, b) => b.similarity - a.similarity);
  };

  initialize();

  return {
    embeddings,
    similarity,
    search,
    vectorize,
  };
}

export default BagOfWordsEmbedder;
