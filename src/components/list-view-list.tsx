import { useAtom } from "jotai";
import { resultsAtom, embeddingsAtom } from "../state";
import ListViewEmptyState from "./list-view-empty-state";
import SimilarityBadge from "./similarity-badge";

export default function ListViewList() {
  const [results] = useAtom(resultsAtom);
  const [embeddings] = useAtom(embeddingsAtom);

  return (
    <div
      id="results"
      className="border border-stone-300 rounded-md bg-white shadow-md divide-y divide-stone-200"
    >
      {results.length === 0 && <ListViewEmptyState />}
      {results.map((result) => (
        <div key={result.id}>
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-lg tracking-tight font-medium flex items-center gap-2">
                {result.title}
                <code className="text-red-600 font-mono bg-stone-100 px-1 py-0 text-xs rounded-md border border-stone-200">
                  ID: {result.id}
                </code>
              </h3>
              <div className="flex items-center gap-2">
                {result.similarity && (
                  <SimilarityBadge similarity={result.similarity} />
                )}
              </div>
            </div>
            <p className="text-sm text-stone-600">{result.content}</p>
          </div>
          <div className="px-4 py-4 overflow-scroll bg-stone-100 ">
            <p className="text-xs font-mono text-red-600 rounded-md text-wrap">
              {JSON.stringify(embeddings.get(result.id))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
