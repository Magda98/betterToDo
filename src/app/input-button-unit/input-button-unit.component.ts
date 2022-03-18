import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-button-unit',
  templateUrl: './input-button-unit.component.html',
  styleUrls: ['./input-button-unit.component.scss']
})
export class InputButtonUnitComponent implements OnInit {
  @Output() submit: EventEmitter<string> = new EventEmitter<string>();
  title: string;

  handleClick() {
    if (this.title) {
      this.submit.emit(this.title);
      this.title = ""
    }
    else {
      alert("You must add a task text")
    }
  }

  constructor() {
    this.title = ""
  }
  
  

 ngOnInit(): void {

}

}
