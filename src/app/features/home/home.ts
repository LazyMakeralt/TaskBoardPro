import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  template: `
  <h2>Accueil</h2>
  <p>Bienvenue sur la page d'accueil.</p>
`
})


export class Home {
  count = 0;
  intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.count++;
      console.log('Compteur Home :', this.count);
    }, 500);
  }

  ngOnDestroy() {
    console.log('Home détruit, interval arrêté');
    clearInterval(this.intervalId);
  }

}
