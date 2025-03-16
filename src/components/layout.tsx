import { useEffect, useState } from "react";
import { embeddingService } from "../services/embedding";
import items from "../data.json";
import ListView from "./list-view";
import EmbeddingsView from "./embeddings-view";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { useAtom } from "jotai";
import { embeddingsAtom } from "../state";

export default function Layout() {
  const [, setEmbeddings] = useAtom(embeddingsAtom);

  useEffect(() => {
    embeddingService.initialize(items);
    setEmbeddings(embeddingService.embeddings);
  }, []);

  return (
    <div className="">
      <Tabs defaultValue="search">
        <TabsList>
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="embeddings">Embeddings</TabsTrigger>
        </TabsList>
        <TabsContent value="search">
          <ListView />
        </TabsContent>
        <TabsContent value="embeddings">
          <EmbeddingsView />
        </TabsContent>
      </Tabs>
    </div>
  );
}
