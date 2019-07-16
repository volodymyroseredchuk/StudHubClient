import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCreateComponent } from './tasks-create.component';

describe('TasksCreateComponent', () => {
  let component: TasksCreateComponent;
  let fixture: ComponentFixture<TasksCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
