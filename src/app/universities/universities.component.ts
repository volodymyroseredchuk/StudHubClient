import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

import {FormControl} from '@angular/forms';
import {UniversityService} from '../service/university.service';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';


@Component({
    selector: 'app-universities',
    templateUrl: './universities.component.html',
    styleUrls: ['./universities.component.scss'],

})
export class UniversitiesComponent implements OnInit {
    myControl = new FormControl();
    public universities = [];
    filtereduniversities: Observable<string[]>;
    user: User;


    constructor(private router: Router, private service: UniversityService,
                private userService: UserService, private activRouter: ActivatedRoute) {
    }

    ngOnInit() {

        this.service.findAllUniversity().subscribe(data => this.universities = data);
        this.getUser();
    }

    getUser() {
        this.userService.getCurrentUser().subscribe(
            user => {
                this.user = user;
            }, () => {
                this.user = null;
            }
        );
    }

    getUniversityById(universityId: number) {
        console.log(universityId);
        this.router.navigate(['/universities', universityId]);
    }

    canChangeOrDeleteUniversity(user) {

        if (!this.user) {
            return false;
        }
        for (let privilege of this.user.privileges) {
            if (privilege.name.toUpperCase() === 'UNIVERSITY_DELETE_ANY_PRIVILEGE') {
                return true;
            }
        }
        return false;
    }

}
