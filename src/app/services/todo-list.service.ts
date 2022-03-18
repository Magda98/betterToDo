import { Injectable } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { StorageService } from './storage.service';

const todoListStorageKey = 'Todo_List';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {
  private todoList: TodoItem[] = [];


  constructor(private storageService: StorageService) {
    this.todoList = storageService.getData(todoListStorageKey);
  }

  getToDoList(): TodoItem[]{
    return this.todoList;
  }

  addItem(item: TodoItem) {
    this.todoList.push(item)
    this.saveList();
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
