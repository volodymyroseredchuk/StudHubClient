import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';
import { UserService } from '../../service/user.service';

@Component({
    selector: 'app-auth',
    templateUrl: './password_reset.component.html',
    styleUrls: ['./password_reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

    resetPasswordForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    resetToken: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService
    ) {  }

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/signin';
        this.resetToken = this.route.snapshot.queryParams['token'];
    }

    // convenience getter for easy access to form fields
    get f() { return this.resetPasswordForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetPasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.resetPassword(this.f.password.value, this.f.confirmPassword.value, this.resetToken)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data.message);
                    this.alertService.success(data.message);
                    setTimeout(() => {
                        this.router.navigate(['/signin']);
                    }, 1500);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
