import { useAtom } from "jotai";
import { resultsAtom } from "../state";
import ListViewEmptyState from "./list-view-empty-state";

export default function ListViewList() {
  const [results] = useAtom(resultsAtom);

  return (
    <div
      id="results"
      className="border border-stone-300 rounded-md bg-white shadow-md divide-y divide-stone-200"
    >
      {results.length === 0 && <ListViewEmptyState />}
      {results.map((result) => (
        <div key={result.id} className="p-4">
          <h3 className="text-lg tracking-tight font-medium flex items-center gap-2">
            {result.title}
            <code className="text-red-600 font-mono bg-stone-100 px-1 py-0 text-xs rounded-md border border-stone-200">
              ID: {result.id}
            </code>
          </h3>
          <p className="text-sm text-stone-600">{result.content}</p>
        </div>
      ))}
    </div>
  );
}
