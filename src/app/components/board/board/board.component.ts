import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Board } from 'src/app/interfaces/board';
import { BoardList } from 'src/app/interfaces/board-list';
import { BoardService } from 'src/app/service/board.service';
import { Issue } from 'src/domain/issue/issue';
import { IssueService } from 'src/domain/issue/issue.service';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board | null = null;
  issues: Issue[] = [];
  newList: string = '';

  constructor(private boardService: BoardService, private activatedRoute: ActivatedRoute, private issueService: IssueService) { }

  itemAdded(event: any) {
    this.issues = this.issues.filter(issue => {
      return issue.id !== event.issue
    });
    this.issueService.findById(event.issue).subscribe(issue => {
      console.log("push")
      this.board?.lists.filter(list => {
        return list.id == event.list
      })[0].issues.push(issue)
      if (this.board !== null) {
        this.boardService.save(this.board).subscribe();
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const boardId: number = parseInt(this.activatedRoute.snapshot.paramMap.get('boardId') as string);
      this.boardService.findById(boardId).subscribe(board => {
        if (!board.lists) {
          board.lists = [];
        }
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

  drop(event: CdkDragDrop<BoardList>) {
    transferArrayItem(event.previousContainer.data.issues, event.container.data.issues, event.previousIndex, event.currentIndex);
    if (this.board !== null) {
      this.boardService.save(this.board).subscribe();
    }
  }

  addList() {
    console.log('click');
    this.board?.lists.push({
      title: this.newList,
      issues: []
    });
    this.newList = '';
    if (this.board !== null) {
      this.boardService.save(this.board).subscribe(data => {
        this.board = data;
      });
    }
  }

}
