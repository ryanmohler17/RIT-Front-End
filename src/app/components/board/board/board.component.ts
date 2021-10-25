import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/interfaces/board';
import { BoardList } from 'src/app/interfaces/board-list';
import { BoardService } from 'src/app/service/board.service';
import { Issue } from 'src/domain/issue/issue';
import { IssueService } from 'src/domain/issue/issue.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board | null = null;
  issues: Issue[] = [];

  constructor(private boardService: BoardService, private activatedRoute: ActivatedRoute, private issueService: IssueService) { }

  itemAdded(event: number) {
    this.issues = this.issues.filter(issue => {
      return issue.id !== event
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const boardId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('boardId') as string);
      this.boardService.getBoard().subscribe(board => {
        this.board = board;
        this.issueService.findAll().subscribe(issues => {
          this.issues = issues.filter(issue => {
            if (this.board != null) {
              for (let list of this.board.lists) {
                for (let item of list.issues) {
                  if (issue.id === item.id) {
                    return false;
                  } 
                }
              }
              return true;
            } else {
              return true;
            }
          })
        })
      })
    })
  }

}
