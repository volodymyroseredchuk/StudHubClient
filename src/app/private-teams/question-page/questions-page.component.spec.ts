import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamQuestionsPageComponent } from './questions-page.component';

describe('TeamQuestionsPageComponent', () => {
  let component: TeamQuestionsPageComponent;
  let fixture: ComponentFixture<TeamQuestionsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamQuestionsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamQuestionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
