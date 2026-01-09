import { TestBed } from '@angular/core/testing';
import { Notification } from './notification';

import { Task } from './task';

describe('TaskService', () => {
  let service: Task;
  let notifSpy: jasmine.SpyObj<Notification>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Notification', ['show']);

    TestBed.configureTestingModule({
      providers: [
        Task,
        { provide: Notification, useValue: spy }
      ]
    });
    service = TestBed.inject(Task);
    notifSpy = TestBed.inject(Notification) as jasmine.SpyObj<Notification>;
  });

  it('doit ajouter une tâche et notifier l’utilisateur', (done) => {
    service.addTask('Nouvelle tâche');
    
    service.tasks$.subscribe(tasks => {
      const task = tasks.find(t => t.title === 'Nouvelle tâche');
      expect(task).toBeTruthy();
      expect(notifSpy.show).toHaveBeenCalled();
      done();
    });
  });

  it('devrait gérer les cas aux limites (Branches)', () => {
    const countBefore = 1;
    service.addTask(''); 
    service.tasks$.subscribe(t => expect(t.length).toBe(countBefore));

    service.removeTask(999); 
    expect(notifSpy.show).not.toHaveBeenCalledWith(jasmine.stringMatching(/classée/));
  });
});
