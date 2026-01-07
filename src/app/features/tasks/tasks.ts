import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Task, Task as TaskService } from '../../core/services/task'; 
import { AsyncPipe } from '@angular/common';
import { ViewChild, ViewContainerRef } from '@angular/core';
import { Alert } from '../alert/alert';
import { TaskHighlight as TaskHighlightComponent } from '../task-highlight/task-highlight';
import { TaskEdit } from '../task-edit/task-edit';
import { TaskStats } from '../tasks-stats/tasks-stats';
import { Notification} from '../../core/services/notification';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AsyncPipe, TaskStats],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css'
})
export class TasksComponent implements OnInit, OnDestroy {
  @ViewChild('alertContainer', { read: ViewContainerRef }) container!: ViewContainerRef;
  @ViewChild('highlightContainer', { read: ViewContainerRef }) highlightContainer!: ViewContainerRef;  private taskService = inject(TaskService);
  public notifService = inject(Notification);
  tasks$ = this.taskService.tasks$; 

  count = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
    }, 1000);
  }

  addTask(input: HTMLInputElement) {
    const title = input.value.trim();
    if (title) {
      this.taskService.addTask(title); 
      
      input.value = ''; 
      input.focus();  
      
      this.notifService.show(`🚀 Tâche "${title}" ajoutée !`);
    }
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  highlightTask(task: any) {
    this.taskService.toggleHighlight(task.id);

    if (!task.highlighted) {
      this.highlightContainer.clear();
      const ref = this.highlightContainer.createComponent(TaskHighlightComponent);
      ref.instance.taskTitle = task.title;
      ref.instance.onRemove = () => {
        this.highlightContainer.clear();
        this.taskService.toggleHighlight(task.id); 
      };
    } else {
      this.highlightContainer.clear();
    }
  }

  editTask(task: any) {
    this.container.clear(); 
    const ref = this.container.createComponent(TaskEdit);
    
    ref.instance.currentTitle = task.title;

    ref.instance.onSave.subscribe((updatedTitle) => {
      this.taskService.updateTask(task.id, updatedTitle);
      ref.destroy();
    });

    ref.instance.onCancel.subscribe(() => ref.destroy());
  }

  deleteTask(id: number) {
    this.taskService.removeTask(id);
  }

  ngOnDestroy() {
    console.log('Tasks détruit, interval arrêté');
    clearInterval(this.intervalId);
  }
}