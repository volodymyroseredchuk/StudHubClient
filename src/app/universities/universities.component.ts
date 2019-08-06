import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {FormControl} from '@angular/forms';
import {UniversityService} from '../service/university.service';


@Component({
    selector: 'app-universities',
    templateUrl: './universities.component.html',
    styleUrls: ['./universities.component.scss'],

})
export class UniversitiesComponent implements OnInit {
    myControl = new FormControl();
    public universities = [];
    filtereduniversities: Observable<string[]>;


    constructor(private router: Router, private service: UniversityService, private activRouter: ActivatedRoute) {
    }

    ngOnInit() {

        this.service.findAllUniversity().subscribe(data => this.universities = data);

    }

    getUniversityById(universityId: number) {
        console.log(universityId);
        this.router.navigate(['/universities', universityId]);
    }


}
