import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from './notification';

@Injectable({
  providedIn: 'root',
})
export class Task {
  private tasks = [
    { id: 1, title: 'Apprendre Angular', completed: false, highlighted: false },
  ];

  private notifService = inject(Notification);

  private tasksSubject = new BehaviorSubject(this.tasks);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask = { id: Date.now(), title, completed: false, highlighted: false };
    this.tasks = [...this.tasks, newTask];
    this.tasksSubject.next(this.tasks);  
  }

  removeTask(id: number) {
    const taskToDelete = this.tasks.find(t => t.id === id);
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.tasksSubject.next(this.tasks);

    if (taskToDelete) {
      this.notifService.show(`🗑️ Tâche "${taskToDelete.title}" supprimée.`);
    }
  }

  updateTask(id: number, newTitle: string) {
    this.tasks = this.tasks.map(t => 
      t.id === id ? { ...t, title: newTitle } : t
    );
    this.tasksSubject.next(this.tasks);
  }

  toggleTask(id: number) {
    this.tasks = this.tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasksSubject.next(this.tasks);
  }

  toggleHighlight(id: number) {
    this.tasks = this.tasks.map(t => 
      t.id === id ? { ...t, highlighted: !t.highlighted } : t
    );
    this.tasksSubject.next(this.tasks);
  }
}
