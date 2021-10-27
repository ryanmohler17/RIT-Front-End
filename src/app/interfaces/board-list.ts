import { Issue } from "src/domain/issue/issue";

export interface BoardList {
    id?: number,
    title: string,
    issues: Issue[]
}
