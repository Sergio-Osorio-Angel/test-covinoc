import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/Task.model';

@Injectable()
export class ApiService {

    private urlApi = 'https://608adc0d737e470017b7410f.mockapi.io/api/v1/todos';

    constructor(private httpClient: HttpClient) {

    }
    saveTask(task: Task) {
        return this.httpClient.post(this.urlApi, task);
    }

    getAllTask() {
        return this.httpClient.get(this.urlApi);
    }

    getTaskForTitle(title:string) {
        return this.httpClient.get(this.urlApi+'?title='+title);
    }

    updateTask(task: Task) {
        return this.httpClient.put(this.urlApi+'/'+task.id, task);
    }

    deleteTask(taskId: string) {
        return this.httpClient.delete(this.urlApi+'/'+taskId);
    }
}