import { useEffect, useState } from "react";
import embeddingService from "../services/embedding";
import { generateItemEmbeddings, cosineSimilarity } from "../services/search";
import items from "../data.json";
import List from "./list";

function search(query: string, items: any[], vocabulary: string[]) {
  const queryEmbedding = embeddingService.createEmbedding(query, vocabulary);

  const results = items.map((item) => {
    const similarity = cosineSimilarity(queryEmbedding, item.embedding);
    return { ...item, similarity };
  });

  return results
    .filter((item) => item.similarity > 0.1)
    .sort((a, b) => b.similarity - a.similarity);
}

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [embeddings, setEmbeddings] = useState<any[]>([]);
  const [vocabulary, setVocabulary] = useState<string[]>([]);

  useEffect(() => {
    const vocabulary = embeddingService.createVocabulary(items);
    const itemsWithEmbeddings = generateItemEmbeddings(
      items,
      vocabulary as string[]
    );
    setEmbeddings(itemsWithEmbeddings);
    setVocabulary(vocabulary);
  }, [query]);

  const results = query.trim() ? search(query, embeddings, vocabulary) : items;

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          className="w-full border bg-zinc-100 p-2 rounded-md"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      <List results={results} />
    </div>
  );
}
