import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { Task as TaskService } from '../core/services/task';  
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [AsyncPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
  template: `
  <h2>Accueil</h2>
  <p>Bienvenue sur la page d'accueil.</p>
`
})


export class Home {
  private taskService = inject(TaskService);  
  tasks$ = this.taskService.tasks$; 

  count = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
      console.log('Compteur :', this.count);
    }, 500);
  }

  addTask(input: HTMLInputElement) {
    const title = input.value.trim();
    if (title) {
      this.taskService.addTask(title); 
      input.value = ''; 
      input.focus();    
    }
  }

  deleteTask(id: number) {
    this.taskService.removeTask(id);
  }

  ngOnDestroy() {
    console.log('Home détruit, interval arrêté');
    clearInterval(this.intervalId);
  }

}
