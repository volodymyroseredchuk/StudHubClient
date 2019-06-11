import { Component, OnInit } from '@angular/core';
import 'src/assets/js/scripts';

declare var mainPageFunction: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.f();
  }

  f() {
    // tslint:disable-next-line:no-unused-expression
    new mainPageFunction();
  }

}
