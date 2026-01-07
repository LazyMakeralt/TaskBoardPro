import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-highlight',
  standalone: true,
  template: `
    <div class="alert shadow-lg border-0 mb-4 p-4" style="background: linear-gradient(135deg, rgba(0, 210, 255, 0.2), rgba(58, 123, 213, 0.2)); border: 1px solid var(--accent-blue) !important;">
      <div class="d-flex align-items-center">
        <i class="bi bi-star-fill text-warning fs-3 me-3 animate-pulse"></i>
        <div>
          <h6 class="text-info mb-1 fw-bold">MISSION PRIORITAIRE</h6>
          <h4 class="text-white mb-0">{{ taskTitle }}</h4>
        </div>
        <button type="button" class="btn-close btn-close-white ms-auto" (click)="close()"></button>
      </div>
    </div>
  `,
  styles: [`
    .animate-pulse { animation: pulse 2s infinite; }
    @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
  `]
})
export class TaskHighlight {
  @Input() taskTitle: string = '';
  @Input() onRemove!: () => void;

  close() {
    if (this.onRemove) this.onRemove();
  }
}