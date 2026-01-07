
## sequence 1 

**Commandes :** `npm install` (installation), `ng serve` (lancement).
**Routes fonctionnelles :** `/home` (Accueil & Gestion des tâches), `/about` (À propos).


## sequence 2 

### 1. Structure du flux
- **Service → Composant** : Le `TaskService` utilise un **BehaviorSubject** qui contient la liste des tâches. Le composant `Home` injecte le service et expose l'observable `tasks$`.
- **Composant → Template** : La vue utilise le **pipe `| async`** pour s'abonner automatiquement au flux et afficher les données en temps réel.

### 2. Ce que j'ai compris
- **BehaviorSubject** : C'est un réservoir de données "intelligent". Il stocke la valeur actuelle (la liste des tâches) et la diffuse immédiatement à tous ceux qui s'y abonnent. Contrairement à un simple Observable, il permet d'émettre de nouvelles valeurs avec `.next()`.
- **Pipe `| async`** : C'est un outil magique dans le HTML qui surveille l'Observable. Il extrait la donnée pour l'affichage et, surtout, il nettoie la mémoire en se désabonnant tout seul quand on change de page.
- **Flux de mise à jour** : Quand je clique sur "Ajouter" ou "Supprimer", le composant donne l'ordre au Service. Le Service modifie son tableau et "pousse" la mise à jour via `.next()`. Le template réagit instantanément car il est branché sur ce flux.

### 3. Points clés retenus
- **Donnée vivante** : Plus besoin de rafraîchir la page ou de rappeler une fonction pour voir les changements.
- **Single Source of Truth** : Le service est le seul maître des données, ce qui évite les bugs de synchronisation.
- **Code Propre** : Moins de `subscribe()` manuels dans le TypeScript grâce au pipe async.

## sequence 3