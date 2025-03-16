import { cn } from "@/lib/utils";

export default function SimilarityBadge({
  similarity,
}: {
  similarity: number;
}) {
  return (
    <span
      className={cn("text-xs px-[3px] py-[2px] rounded-md border font-mono", {
        "bg-green-300/50 text-green-600 border-green-200": similarity >= 0.5,
        "bg-yellow-300/50 text-yellow-600 border-yellow-200":
          similarity >= 0.25 && similarity < 0.5,
        "bg-red-300/50 text-red-600 border-red-200": similarity < 0.25,
      })}
    >
      Similarity: {similarity.toFixed(2)}
    </span>
  );
}
