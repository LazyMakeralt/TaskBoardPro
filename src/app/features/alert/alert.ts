import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    <div class="alert alert-success shadow-lg border-0 bg-glass text-white mb-3">
      <i class="bi bi-check-circle me-2"></i> {{ message }}
    </div>
  `,
  styles: [`
    .bg-glass { background: rgba(25, 135, 84, 0.8); backdrop-filter: blur(5px); }
  `]
})
export class Alert {
  @Input() message: string = '';
}