import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  stats = [
    { label: 'Utilisateurs Actifs', value: '12K+' },
    { label: 'Tâches Automatisées', value: '1.2M' },
    { label: 'Temps de Latence', value: '< 20ms' }
  ];

  values = [
    { title: 'Innovation Réactive', desc: 'Nos algorithmes utilisent RxJS pour une synchronisation instantanée.' },
    { title: 'Sécurité Native', desc: 'Architecture Standalone garantissant une isolation totale des données.' },
    { title: 'Éco-conception', desc: 'Optimisation du cycle de vie des composants pour un impact CPU minimal.' }
  ];
}