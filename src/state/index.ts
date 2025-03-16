import { atom } from "jotai";
import BagOfWordsEmbedder from "../services/bag-of-words-embedder";

const queryAtom = atom<string>("");
const resultsAtom = atom<any[]>([]);
const embedderAtom = atom<ReturnType<typeof BagOfWordsEmbedder> | null>(null);
const embeddingsAtom = atom<Map<string, number[]>>(new Map());

export { queryAtom, resultsAtom, embeddingsAtom, embedderAtom };
