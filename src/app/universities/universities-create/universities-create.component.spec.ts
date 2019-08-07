import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UniversitiesCreateComponent} from './universities-create.component';

describe('UniversitiesCreateComponent', () => {
    let component: UniversitiesCreateComponent;
    let fixture: ComponentFixture<UniversitiesCreateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UniversitiesCreateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UniversitiesCreateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
