import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.sass']
})
export class ListTaskComponent implements OnInit {

  @Input() tasks!: any[];
  @Output() search = new EventEmitter<string>();
  @Output() refresh = new EventEmitter<true>();
  page: number;
  inputSearch: string;


  constructor(private apiService: ApiService) {
    this.page = 1;
    this.inputSearch = "";
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.onKeyPress();
  }

  onKeyPress() {
    this.search.emit(this.inputSearch);
  }

  onDeleteTask(task: any) {
    this.apiService.deleteTask(task.id).subscribe((response: any) => {
      if (response?.id == task.id) {
        this.refresh.emit(true);
      }
    });
  }

  onChangeState(task: any) {
    task.state = !task.state;
    this.apiService.updateTask(task).subscribe((response:any) => {
      if (response?.id == task.id) {
        this.refresh.emit(true);
      }
    });
  }

}
