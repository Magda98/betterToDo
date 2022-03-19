import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';



const todoListStorageKey = 'Todo_List';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoList: TodoItem[] = [];
  private todoListSubject: Subject<TodoItem[]> = new Subject<TodoItem[]>();
  private baseUrl = "http://localhost:3000/";


  constructor(private storageService: StorageService, private http: HttpClient) {
    this.todoList = storageService.getData(todoListStorageKey);
    this.retrieveListFromDataBase();
  }

  getToDoList(): Observable<TodoItem[]>{
    return this.todoListSubject.asObservable();
  }

  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>(`${this.baseUrl}items`).subscribe(
      response => this.todoListSubject.next(response)
    );
  }

  addItem(item: TodoItem) {
    this.http.post(`${this.baseUrl}items`, item)
      .subscribe(
      () => this.retrieveListFromDataBase()
    );
  }

  updateItem(item: TodoItem, changes: Partial<TodoItem>) {
    const changedItem = {...item, ...changes}
     return this.http.put(`${this.baseUrl}items/${item._id}`, changedItem).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }

  deleteItem(item: TodoItem) {
    return this.http.delete(`${this.baseUrl}items/${item._id}`).subscribe(
      () => this.retrieveListFromDataBase()
    );
  }

}
