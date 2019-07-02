import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersCreateComponent } from './teachers-create.component';

describe('TeachersCreateComponent', () => {
  let component: TeachersCreateComponent;
  let fixture: ComponentFixture<TeachersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
