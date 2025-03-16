import { useAtom } from "jotai";
import { resultsAtom } from "../state";
import ListViewEmptyState from "./list-view-empty-state";

import { cn } from "@/lib/utils";

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
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg tracking-tight font-medium flex items-center gap-2">
              {result.title}
              <code className="text-red-600 font-mono bg-stone-100 px-1 py-0 text-xs rounded-md border border-stone-200">
                ID: {result.id}
              </code>
            </h3>
            <div className="flex items-center gap-2">
              {result.similarity && (
                <span
                  className={cn(
                    "text-xs px-[3px] py-[2px] rounded-md border font-mono",
                    result.similarity > 0.5 &&
                      "bg-green-300/50 text-green-600 border-green-200",
                    result.similarity > 0.25 &&
                      result.similarity < 0.5 &&
                      "bg-yellow-300/50 text-yellow-600 border-yellow-200",
                    result.similarity < 0.25 &&
                      "bg-red-300/50 text-red-600 border-red-200"
                  )}
                >
                  Similarity: {result.similarity.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-stone-600">{result.content}</p>
        </div>
      ))}
    </div>
  );
}
