import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notification } from '../../core/services/notification';

import { Task } from '../../core/services/task';

describe('Task Service', () => {
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

  it('doit ajouter une tâche et notifier l’utilisateur', () => {
    service.addTask('Tester Angular');

    service.tasks$.subscribe(tasks => {
      expect(tasks.some(t => t.title === 'Tester Angular')).toBeTrue();
    });

    expect(notifSpy.show).toHaveBeenCalledWith(jasmine.stringMatching(/Tester Angular/));
  });

  it('doit supprimer une tâche existante et notifier', () => {
    service.removeTask(1);

    service.tasks$.subscribe(tasks => {
      expect(tasks.find(t => t.id === 1)).toBeUndefined();
    });
    expect(notifSpy.show).toHaveBeenCalledWith(jasmine.stringMatching(/classée/));
  });

  it('doit changer l’état de complétion d’une tâche', () => {
    service.toggleTask(1); 
    
    service.tasks$.subscribe(tasks => {
      const task = tasks.find(t => t.id === 1);
      expect(task?.completed).toBeFalse();
    });
  });

  it('ne doit pas ajouter de tâche si le titre est vide', () => {
    const initialCount = 1; 
    service.addTask('   '); 

    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(initialCount);
    });
  });

});
