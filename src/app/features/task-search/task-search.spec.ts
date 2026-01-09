import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskSearchComponent } from './task-search';

describe('TaskSearchComponent', () => {
  let component: TaskSearchComponent;
  let fixture: ComponentFixture<TaskSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSearchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit émettre une valeur lors de la saisie', () => {
    spyOn(component.search, 'emit');
    const input = fixture.nativeElement.querySelector('input');
    
    input.value = 'Angular';
    input.dispatchEvent(new Event('input'));

    expect(component.search.emit).toHaveBeenCalledWith('Angular');
  });
});
