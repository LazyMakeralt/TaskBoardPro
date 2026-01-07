import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksStats } from './tasks-stats';

describe('TasksStats', () => {
  let component: TasksStats;
  let fixture: ComponentFixture<TasksStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksStats]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TasksStats);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
