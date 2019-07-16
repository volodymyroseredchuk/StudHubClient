import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamQuestionAnswerComponent } from './answer.component';

describe('TeamQuestionAnswerComponent', () => {
  let component: TeamQuestionAnswerComponent;
  let fixture: ComponentFixture<TeamQuestionAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamQuestionAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamQuestionAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
