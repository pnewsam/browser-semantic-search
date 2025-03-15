import { useEffect, useState } from "react";
import { embeddingService } from "../services/embedding";
import items from "../data.json";
import ListView from "./list-view";
import EmbeddingsView from "./embeddings-view";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";

export default function Layout() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(items);
  const [embeddings, setEmbeddings] = useState(embeddingService.embeddings);

  useEffect(() => {
    embeddingService.initialize(items);
    setEmbeddings(embeddingService.embeddings);
  }, []);

  const onSearch = () => {
    setResults(query?.trim() ? embeddingService.search(query, items) : items);
  };

  const isFiltered = Boolean(query?.trim() && results.length < items.length);

  const reset = () => {
    setQuery("");
    setResults(items);
  };

  return (
    <div className="">
      <Tabs defaultValue="search">
        <TabsList>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <ListView
            results={results}
            onSearch={onSearch}
            query={query}
            setQuery={setQuery}
            isFiltered={isFiltered}
            reset={reset}
          />
        </TabsContent>
        <TabsContent value="embeddings">
          <EmbeddingsView embeddings={embeddings} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
