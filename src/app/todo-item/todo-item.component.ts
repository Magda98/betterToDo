import { TodoItem, TodoItemUpdate } from './../interfaces/todo-item';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
  
  
export class TodoItemComponent implements OnInit {
  @Input() item!: TodoItem;
  @Output() remove: EventEmitter<TodoItem> = new EventEmitter<TodoItem>();
  @Output() complete: EventEmitter<TodoItemUpdate> = new EventEmitter<TodoItemUpdate>();

  constructor() { }

  ngOnInit(): void {
  }
  completeItem(checked: boolean) {
    this.complete.emit({ item: this.item, completed: checked});
  }

  removeItem() {
    this.remove.emit(this.item);
  }

}
