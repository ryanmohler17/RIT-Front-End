import { BoardList } from "./board-list";

export interface Board {
    id: number,
    title: string,
    description: string,
    creator: number,
    lists: BoardList[]
}
