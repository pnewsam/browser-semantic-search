import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SearchIcon, XIcon } from "lucide-react";

export default function ListView({
  results,
  onSearch,
  query,
  setQuery,
  isFiltered,
  reset,
}: {
  results: any[];
  onSearch: () => void;
  query: string;
  setQuery: (query: string) => void;
  isFiltered: boolean;
  reset: () => void;
}) {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <Input
          className="w-full bg-white h-10 border-stone-300"
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <Button
          className="h-10"
          onClick={() => {
            onSearch();
          }}
        >
          <SearchIcon className="w-4 h-4" />
          Search
        </Button>
        {isFiltered && (
          <Button variant="outline" className="h-10" onClick={reset}>
            <XIcon className="w-4 h-4" />
            Reset
          </Button>
        )}
      </div>
      <div
        id="results"
        className="border border-stone-300 rounded-md bg-white shadow-md divide-y divide-stone-200"
      >
        {results.length === 0 && (
          <p className="text-stone-600">No results found.</p>
        )}

        {results.map((result) => (
          <div key={result.id} className="p-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              {result.title}
              <code className="text-red-600 font-mono bg-stone-100 px-1 py-0 text-xs rounded-md border border-stone-200">
                ID: {result.id}
              </code>
            </h3>
            <p className="text-sm text-stone-600">{result.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
