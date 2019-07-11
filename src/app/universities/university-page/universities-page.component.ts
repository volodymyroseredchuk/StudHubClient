import { Component, Input } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {UniversitiesComponent} from "../universities.component";

import {University} from "../../model/university.model";
import {UniversityService} from "../../service/university.service";



@Component({
    selector: 'app-universities-page',
    templateUrl: './universities-page.component.html',
    styleUrls: ['./universities-page.component.scss']
  })
export class UniversitiesPageComponent{
  
  
   university: University;

  constructor(private universityService: UniversityService, private tlist: UniversitiesComponent, private route: ActivatedRoute,
              private router: Router){
    
  }

  ngOnInit() {
      this.getUniversity();
  }

  getUniversity() {

    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.universityService.showUniversityPage(id)
      .subscribe(university => this.university = this.university);
  }

  

}
