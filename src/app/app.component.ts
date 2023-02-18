
import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'test-covinoc';
  tasks: any[] = [];

  constructor(private apiService: ApiService) {
    this.getAllTasks();
  }

  onRefreshTask(event: any) {
    this.getAllTasks();
  }

  onSearchTasks(event: any) {
    this.getTaskForTitle(event);
  }

  getAllTasks() {
    this.apiService.getAllTask().subscribe(
      (response: any) => {
        if (response?.length === 0) {
          this.tasks = [];
        } else {
          this.tasks = response.reverse();
        }
      }
    );
  }
  
  getTaskForTitle(title:string) {
    this.apiService.getTaskForTitle(title).subscribe(
      (response: any) => {
        if (response?.length === 0) {
          this.tasks = [];
        } else {
          this.tasks = response;
        }
      }
    );
  }
}
