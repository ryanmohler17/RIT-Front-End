import { BoardList } from "./board-list";

export interface Board {
    id: number,
    name: string,
    description: string,
    creator: number,
    lists: BoardList[]
}
