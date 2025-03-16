import { atom } from "jotai";

const queryAtom = atom<string>("");
const resultsAtom = atom<any[]>([]);
const embeddingsAtom = atom<Map<string, number[]>>(new Map());

export { queryAtom, resultsAtom, embeddingsAtom };
