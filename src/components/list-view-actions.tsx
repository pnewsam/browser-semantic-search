import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAtom } from "jotai";
import { embedderAtom, queryAtom, resultsAtom } from "../state";
import items from "../data.json";

export default function ListViewActions() {
  const [query, setQuery] = useAtom(queryAtom);
  const [results, setResults] = useAtom(resultsAtom);
  const [embedder] = useAtom(embedderAtom);

  const onSearch = () => {
    if (!embedder) return;
    setResults(query?.trim() ? embedder.search(query, items) : items);
  };

  const isFiltered = Boolean(results.length < items.length);

  const reset = () => {
    setQuery("");
    setResults(items);
  };

  return (
    <div className="flex gap-2 mb-4">
      <Input
        className="w-full bg-white h-10 border-stone-300"
        placeholder="Enter a query such as 'javascript', or 'and'"
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      {isFiltered && (
        <Button variant="outline" className="h-10" onClick={reset}>
          <XIcon className="w-4 h-4" />
          Reset
        </Button>
      )}
      <Button
        className="h-10"
        onClick={() => {
          onSearch();
        }}
      >
        <SearchIcon className="w-4 h-4" />
        Search
      </Button>
    </div>
  );
}
