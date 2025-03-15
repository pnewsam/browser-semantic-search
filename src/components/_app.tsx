import Layout from "./layout";

export default function App() {
  return (
    <main className="bg-stone-100 min-h-screen">
      <div className="container max-w-screen-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-4">
          Browser Semantic Search
        </h1>
        <p className="text-zinc-600 mb-4">
          This is a simple semantic search. It creates embeddings of the text of
          the page, and then when the user searches, it creates an embedding of
          the query and filters the results based on the similarity of the
          embeddings.
        </p>
        <Layout />
      </div>
    </main>
  );
}
