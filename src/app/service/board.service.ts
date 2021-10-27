import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Board } from '../interfaces/board';
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private emptyBoard: Board = {
    id: 0,
    title: 'Test',
    description: 'This is a test board',
    creator: 0,
    lists: [
      {
        id: 1,
        title: 'To Do',
        issues: [
          {
            id: 1,
            title: 'Test issue 1',
            description: 'This is a test issue',
            category: 'test',
            severity: 'test'
          },
          {
            id: 2,
            title: 'Test issue 3',
            description: 'This is a test issue',
            category: 'test',
            severity: 'test'
          }
        ]
      },
      {
        id: 2,
        title: 'In Progress',
        issues: [
          {
            id: 3,
            title: 'Test issue 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dignissim at lorem vitae auctor. Donec at lorem et libero tempor posuere. Donec malesuada felis a tempor cursus. Ut interdum velit tortor, vitae vehicula nibh ultricies a. Praesent suscipit sem in justo tristique hendrerit. Donec facilisis, dui in molestie varius, turpis urna posuere mi, non ultricies lacus odio vitae libero. Sed convallis et neque et tincidunt. In mollis lorem sit amet sapien pretium, suscipit vulputate sem ornare. Nulla at nisi eu augue feugiat ullamcorper. Sed sed aliquet massa. In finibus, nisl non bibendum sollicitudin, lorem tellus blandit lacus, ac lacinia odio est quis dui. ',
            category: 'test',
            severity: 'test'
          }
        ]
      }
    ]
  }


  constructor(private http: HttpClient) {

  }

  private board = new BehaviorSubject<Board>(this.emptyBoard);

  getBoard(): Observable<Board> {
    return this.board.asObservable()
  }


  findAll(): Observable<Board[]> {
    return this.http.get<Board[]>(`${environment.apiURL}/board/getAllBoards`);
  }

  findById(boardId: number): Observable<Board> {
    return this.http.get<Board>(`${environment.apiURL}/board/getBoardById/${boardId}`);
  }

  save(board: Board): Observable<Board> {
    return this.http.patch<Board>(`${environment.apiURL}/board/updateBoard/${board.id}`, board);
  }

  delete(boardId: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiURL}/board/${boardId}`);
  }
}
