
import { Component } from '@angular/core';
import { Task } from './models/Task.model';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'test-covinoc';
  tasks: Task[];
  taskSearch: Task[];
  lastSearch: string;


  constructor(private apiService: ApiService) {
    this.tasks = [];
    this.taskSearch = [];
    this.lastSearch = '';
    this.getAllTasks();
    
  }

  /**
   * Esta función se encarga de acutalizar las tareas almacenadas
   * @param event - Valor booleano que emite el componente hijo
   */
  onRefreshTask(event: boolean) {
    this.getAllTasks();
  }

  /**
   * Esta función se encarga de filtrar las tareas a partir
   * de una cadena de búsqueda
   * @param search - cadena de búsqueda
   */
  onSearchTasks(search: string) {
    this.lastSearch = search.toUpperCase();
    this.filterTasks();
  }

  /**
   * Esta función consume el servicio de la api que se encarga de extraer
   * todas las tareas.
   * En caso de tener una cadena de búsqueda registrada, se filtra nuevamente los datos.
   */
  getAllTasks() {
    this.apiService.getAllTask().subscribe(
      (response: any) => {
        if (response?.length === 0) {
          this.tasks = [];
        } else {
          this.tasks = response.reverse();
          if (this.lastSearch !== '') {
            this.filterTasks();
          } else {
            this.taskSearch = [...this.tasks];
          }
        }
      }, error => {
        console.log(error);
      }
    );
  }

  /**
   * Esta función filtra todas las tareas almacenadas, según la últmima cadena de búsqueda
   */
  filterTasks(){
    this.taskSearch = this.tasks.filter(task => task.title.toUpperCase().includes(this.lastSearch));
  }

  /**
   * Esta función consume el servico de la api que se encarga de filtrar las tareas
   * según una cadena de búsqueda que hace referencia al título de la tarea
   * @param title - Cadena de búsqueda
   */
  getTaskForTitle(title: string) {
    this.apiService.getTaskForTitle(title).subscribe(
      (response: any) => {
        if (response?.length === 0) {
          this.tasks = [];
        } else {
          this.tasks = response;
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
