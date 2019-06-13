import { Component, OnInit } from '@angular/core';
import 'src/assets/js/scripts';
import {MatSnackBar} from '@angular/material/snack-bar';

declare var mainPageFunction: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private _snackBar: MatSnackBar;

  constructor(_snackBar: MatSnackBar) {
    this._snackBar = _snackBar;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open('Action2', action, {
      duration: 12000,
      verticalPosition: 'top',
      horizontalPosition: 'right'
    });

  }

  ngOnInit() {
    this.f();
  }

  f() {
    // tslint:disable-next-line:no-unused-expression
    new mainPageFunction();
  }

}
