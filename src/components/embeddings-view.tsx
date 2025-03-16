import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useAtom } from "jotai";
import { embeddingsAtom } from "../state";

export default function Embeddings() {
  const [embeddings] = useAtom(embeddingsAtom);

  return (
    <div className="border border-stone-300 rounded-md bg-white overflow-hidden">
      <Table className="border border-stone-300 rounded-md bg-white overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead className="text-stone-800">ID</TableHead>
            <TableHead className="text-stone-800">Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(embeddings.entries()).map(([id, value], index, arr) => (
            <TableRow
              key={id}
              className={index === arr.length - 1 ? "last-row" : ""}
            >
              <TableCell>{id}</TableCell>
              <TableCell className="text-xs font-mono">
                <p className="text-red-600">{JSON.stringify(value, null, 2)}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
