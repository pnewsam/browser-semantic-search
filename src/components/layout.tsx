import { useEffect } from "react";
import { useAtom } from "jotai";

import { embeddingService } from "../services/embedding";
import items from "../data.json";
import ListView from "./list-view";
import EmbeddingsView from "./embeddings-view";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
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
        <TabsList className="bg-zinc-200/50 space-x-2 h-12">
          <TabsTrigger className="h-10" value="search">
            Search
          </TabsTrigger>
          <TabsTrigger className="h-10" value="embeddings">
            Embeddings
          </TabsTrigger>
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
