
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

### 1. Organisation par Fonctionnalités (Features)
L'application est structurée dans le dossier `features/` (Home, Tasks, About). 
- **Bénéfice** : Séparation claire des responsabilités et maintenance facilitée.
- **Lazy Loading** : Les composants sont chargés via `loadComponent()`. Le navigateur ne télécharge le code de la page que si l'utilisateur y accède, optimisant drastiquement le temps de chargement initial.

### 2. Dynamisme avec le DOM
J'ai implémenté l'injection de composants à la volée (comme `TaskHighlight`) sans les déclarer dans le HTML fixe.



- **ViewContainerRef** : Utilisé comme un point d'ancrage (`#container`) dans le template où le composant sera injecté.
- **createComponent()** : Permet de générer le composant par programmation.
- **ref.instance** : Permet de piloter le composant créé (envoyer le titre de la tâche, gérer la fermeture).

### 3. Points clés retenus
* **Performance** : Moins de code chargé au démarrage grâce au Lazy Loading.
* **Flexibilité** : Les composants dynamiques permettent de créer des interfaces riches (alertes, mises en avant) sans alourdir le DOM de base.
* **Professionnalisme** : Cette structure respecte les standards des grandes entreprises utilisant Angular.