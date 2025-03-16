import { CircleSlashIcon } from "lucide-react";

export default function ListViewEmptyState() {
  return (
    <div className="p-4 flex flex-col items-center justify-center gap-2">
      <CircleSlashIcon className="w-10 h-10 stroke-[0.75px] text-stone-400" />
      <p className="text-stone-600">No results found.</p>
    </div>
  );
}
