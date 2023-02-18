import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/Task.model';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-task',
  templateUrl: './form-add-task.component.html',
  styleUrls: ['./form-add-task.component.sass']
})
export class FormAddTaskComponent implements OnInit {

  @Output () refreshEvent = new EventEmitter<boolean>();

  taskForm: FormGroup;

  constructor(private apiService: ApiService, private fb:FormBuilder) {
    this.taskForm = this.fb.group({
      titleTask: ['', [Validators.required, Validators.minLength(3)]],
      statusTask: [false]
    })
  }

  ngOnInit(): void {
  }

  /**
   * Esta función se encarga de realizar el submit del formulario
   * @param event - Evento del formulario
   */
  onSubmit(event: any) {
    event.preventDefault();
    this.saveNewTask();
  }

  /**
   * Esta función consume el servicio de la api que se encarga de
   * crear una nueva tarea
   */
  saveNewTask() {
    const date = new Date();
    const task = new Task(date.toJSON(), this.taskForm.value.statusTask, this.taskForm.value.titleTask);
    this.apiService.saveTask(task).subscribe(
      (response:any) => {
        if (response?.id) {
          this.resetForm();
          this.refreshEvent.emit(true);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  /**
   * Esta función se encarga de formatear el formulario de crear una nueva tarea
   */
  resetForm() {
    this.taskForm.reset(this.taskForm);
  }

  get titleTask() {
    return this.taskForm.get('titleTask');
  }
}
