import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamQuestionsCreateComponent } from './questions-create.component';

describe('TeamQuestionsCreateComponent', () => {
  let component: TeamQuestionsCreateComponent;
  let fixture: ComponentFixture<TeamQuestionsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamQuestionsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamQuestionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
