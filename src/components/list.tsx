export default function List({ results }: { results: any[] }) {
  return (
    <div
      id="results"
      className="border border-zinc-200 rounded-md bg-zinc-100 shadow-md divide-y divide-zinc-200"
    >
      {results.length === 0 && (
        <p className="text-zinc-600">No results found.</p>
      )}

      {results.map((result) => (
        <div key={result.id} className="p-4">
          <h3 className="text-lg font-bold">{result.title}</h3>
          <p className="text-sm text-zinc-600">{result.content}</p>
        </div>
      ))}
    </div>
  );
}
