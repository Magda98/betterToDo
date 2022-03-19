import { TodoItemUpdate } from './../interfaces/todo-item';
import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';
import { TodoListService } from '../services/todo-list.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-manager',
  templateUrl: './list-manager.component.html',
  styleUrls: ['./list-manager.component.scss']
})
export class ListManagerComponent implements OnInit {
  todoList!: Observable<TodoItem[]>;

  constructor(private todoListService: TodoListService) {
  }
  
  addItem(title: string) {    
    this.todoListService.addItem({ title });
  }

  ngOnInit(): void {
    this.todoList = this.todoListService.getToDoList();
  }

  removeItem(item: TodoItem): void {
    this.todoListService.deleteItem(item);
  }

  completeItem(itemUpdate: TodoItemUpdate) {
    this.todoListService.updateItem(itemUpdate.item, {completed: itemUpdate.completed});
  }

}
