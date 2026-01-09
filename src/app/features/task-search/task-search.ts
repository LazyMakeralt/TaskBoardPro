import { Component } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-task-search',
  standalone: true,
  template: `<input (input)="onSearch($event)" placeholder="Rechercher...">`
})
export class TaskSearchComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: any) {
    this.search.emit(event.target.value);
  }
}