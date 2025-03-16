import Layout from "./layout";

export default function App() {
  return (
    <main className="bg-stone-100 min-h-screen">
      <div className="container max-w-screen-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold tracking-tight mb-4">
          Browser Semantic Search
        </h1>
        <p className="text-zinc-600 mb-4">
          This is a very simple semantic search. It creates embeddings of the
          text on the page. Then when the user searches, it creates an embedding
          of the query and filters the results based on the degree of
          similarity.
        </p>
        <p className="text-zinc-600 mb-4">
          This uses a very simple "bag-of-words" embedding model, which means
          that the search just looks for the records where the inputted word(s)
          are present. If the word is present many times over, the similarity
          score will be higher.
        </p>
        <p className="text-zinc-600 mb-8">
          You'll notice that two records might have the inputted word the same
          number of times, but different similarity scores nonetheless. This is
          because the embedding also encodes how much "weight" the word has in
          the record. If another word features very frequently in a given
          record, the relative weight of the inputted word will be lower.
        </p>
        <Layout />
      </div>
    </main>
  );
}
