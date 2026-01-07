import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="card bg-dark border-primary p-3 mb-3 shadow">
      <h6 class="text-primary mb-2">Modifier la mission</h6>
      <div class="d-flex gap-2">
        <input [(ngModel)]="newTitle" class="form-control bg-dark text-white border-secondary">
        <button class="btn btn-success" (click)="save()">Valider</button>
        <button class="btn btn-outline-danger" (click)="cancel()">Annuler</button>
      </div>
    </div>
  `
})
export class TaskEdit {
  @Input() currentTitle: string = '';
  @Output() onSave = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();

  newTitle: string = '';

  ngOnInit() {
    this.newTitle = this.currentTitle; 
  }

  save() { this.onSave.emit(this.newTitle); }
  cancel() { this.onCancel.emit(); }
}