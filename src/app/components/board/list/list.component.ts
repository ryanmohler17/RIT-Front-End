import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BoardList } from 'src/app/interfaces/board-list';
import { Issue } from 'src/domain/issue/issue';
import { IssueService } from 'src/domain/issue/issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnChanges {

  @Input() list: BoardList;
  @Input() items: Issue[];
  @Output() addItemEvent = new EventEmitter<any>();
  itemsFiltered: Issue[] = [];
  searchText: string = '';

  constructor(private issueService: IssueService) { }

  ngOnChanges(changes: SimpleChanges): void {
    const chng = changes['items'];
    this.items = chng.currentValue;
    this.itemsFiltered = this.items;
  }

  ngOnInit(): void {
    this.itemsFiltered = this.items;
  }

  inputChange() {
    if (this.itemsFiltered.length) {
      this.itemsFiltered = this.items.filter(issue => {
        return issue.title.includes(this.searchText)
      })/*.filter(issue => {
        try {
          return issue.id === parseInt(this.searchText);
        } catch (e) {
          return true;
        }
      })*/
    } else {
      this.itemsFiltered = this.items;
    }
  }

  addIssue(id?: number) {
    console.log(id);
    if (!id) {
      return;
    }
    this.issueService.findById(id).subscribe(issue => {
      this.list.issues.push(issue);
    });
    this.addItemEvent.emit({
      issue: id,
      list: this.list.id
    });
  }

}
