import { Component, inject } from '@angular/core';
import { AsyncPipe, DecimalPipe } from '@angular/common';
import { Task } from '../../core/services/task';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-stats',
  standalone: true,
  imports: [AsyncPipe, DecimalPipe],
  templateUrl: './tasks-stats.html',
  styleUrl: './tasks-stats.css'
})
export class TaskStats {
  private taskService = inject(Task); 

  stats$ = this.taskService.tasks$.pipe(
    map(tasks => {
      const total = tasks.length;
      const completed = tasks.filter(t => t.completed).length;
      const pending = total - completed;
      const percent = total > 0 ? (completed / total) * 100 : 0;

      return { total, completed, pending, percent };
    })
  );
}
