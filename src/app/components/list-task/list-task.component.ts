import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/models/Task.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.sass']
})
export class ListTaskComponent implements OnInit {

  @Input() tasks!: Task[];
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

  /**
   * Esta función se encarga de enviar el submit del buscador de tareas
   */
  onSubmit() {
    this.onKeyPress();
  }

  /**
   * Esta función se encarga de enviar la cadena de búsqueda
   * al componente padre, para que filtre las tareas.
   */
  onKeyPress() {
    this.search.emit(this.inputSearch);
  }

  /**
   * Esta función consume el servicio de la api que se encarga
   * de eliminar una tarea
   * @param task - Tarea a eliminar
   */
  onDeleteTask(task: any) {
    this.apiService.deleteTask(task.id).subscribe((response: any) => {
      if (response?.id == task.id) {
        this.refresh.emit(true);
      }
    }, error => {
      console.log(error);
    });
  }

  /**
   * Esta función consume el servicio de la api que se encarga
   * de modificar el estado de una tarea
   * @param task - Tarea a actualizar
   */
  onChangeState(task: any) {
    task.state = !task.state;
    this.apiService.updateTask(task).subscribe((response:any) => {
      if (response?.id == task.id) {
        this.refresh.emit(true);
      }
    }, error => {
      console.log(error);
    });
  }
}
