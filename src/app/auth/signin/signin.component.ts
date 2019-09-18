import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '../../service/alert.service';
import { AuthenticationService } from '../../service/authentication.service';
import { SocketService } from '../../service/socket.service';
import { MatSnackBar } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { UserService } from 'src/app/service/user.service';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-auth',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  token: string;
  constructor(
    private socialAuthService: AuthService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService) {}

  ngOnInit() {
    // redirect to home if already logged in
    if (localStorage.getItem('accessToken')) {
      this.router.navigate(['/']);
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.token = this.route.snapshot.queryParams['token'];

    if (this.token) {
      this.loading = true;
      this.userService.confirmAccount(this.token).toPromise()
        .then(data => {
          this.alertService.success(data.message);
        }).then(() => {
          this.loading = false;
        }).catch(error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          window.location.href = this.returnUrl;
          this.loading = false;
        },
        error => {
          console.log(error);
          this.alertService.error(error);
          this.loading = false;
        });
  }
  public signinWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData) => {
      console.log(userData);
      this.loading = true;
      this.authenticationService.loginGoogle(userData)
        .pipe(first())
        .subscribe(
          data => {
            window.location.href = this.returnUrl;
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    });
  }

  public signinWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData) => {
      
      console.log(userData);
      this.loading = true;
      this.authenticationService.loginFacebook(userData)
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            window.location.href = this.returnUrl;
            this.loading = false;
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    });
  }
}
