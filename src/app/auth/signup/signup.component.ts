import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';
import { AuthenticationService } from '../../service/authentication.service';
import { UserService } from '../../service/user.service';
import { University } from 'src/app/model/university.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-auth',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    myControl = new FormControl();
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    private universities: University[];
    private selectedUniversityName: "None";
    private selectedUniversity: University;
    options: string[];
    filteredOptions: Observable<string[]>;

    constructor(
        private http: HttpClient,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService
    ) { }

    ngOnInit() {

        // redirect to home if already logged in
        if (localStorage.getItem('accessToken')) {
            this.router.navigate(['/']);
        }

        this.registerForm = this.formBuilder.group({
            firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
            lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(60)]],
            username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            university: new University(),
            creationDate: new Date()
        });

        this.getUniversities();
    }

    async getUniversities() {
        this.options = [];
        let url = "http://localhost:8080/universities";
        await this.http.get<University[]>(url).toPromise().then(data => {
            console.log(data);
            this.universities = data;
        }).then(() => {
            this.universities.forEach(university => {
                this.options.push(university.name);
            });
        }).then(() => {
            console.log(this.options);
        }).then(() => {
            this.filteredOptions = this.myControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filter(value))
                );
        });
    }

    getUniverFromName(option: string) {
        this.selectedUniversity = this.universities.find(university => {
            return university.name === option;
        });
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        console.log(this.selectedUniversity);
        this.registerForm.controls['university'].setValue(this.selectedUniversity);
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success(data["message"], true);
                    this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}