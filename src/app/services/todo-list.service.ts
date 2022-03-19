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


  constructor(private storageService: StorageService, private http: HttpClient) {
    this.todoList = storageService.getData(todoListStorageKey);
    this.retrieveListFromDataBase();
  }

  getToDoList(): Observable<TodoItem[]>{
    return this.todoListSubject.asObservable();
  }

  retrieveListFromDataBase() {
    this.http.get<TodoItem[]>('http://localhost:3000/items').subscribe(
      response => this.todoListSubject.next(response)
    );
  }

  addItem(item: TodoItem) {
    this.http.post('http://localhost:3000/items', item)
      .subscribe(
      () => this.retrieveListFromDataBase()
    );
  }

  updateItem(item: TodoItem, changes: Partial<TodoItem>): void {
    const index = this.todoList.indexOf(item);
    this.todoList[index] = {...item, ...changes };
    this.saveList();
  }

  deleteItem(item: TodoItem): void {
    const index = this.todoList.indexOf(item);
    this.todoList.splice(index, 1);
    this.saveList();
  }

  private saveList() {
    this.storageService.setData(todoListStorageKey, this.todoList);
  }
}
