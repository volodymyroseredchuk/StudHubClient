import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsCreateComponent } from './proposals-create.component';

describe('ProposalsCreateComponent', () => {
  let component: ProposalsCreateComponent;
  let fixture: ComponentFixture<ProposalsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
