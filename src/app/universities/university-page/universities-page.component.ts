import {Component, Input, OnInit} from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {University} from '../../model/university.model';
import {UniversityService} from '../../service/university.service';
import {UniversitiesComponent} from '../universities.component';
import {FeedbackService} from '../../service/feedback.service';
import {Feedback} from '../../model/feedback.model';


@Component({
    selector: 'app-universities-page',
    templateUrl: './universities-page.component.html',
    styleUrls: ['./universities-page.component.scss']
  })
export class UniversitiesPageComponent implements OnInit{
   university: University;
    feedbacks: Feedback[];
    universityId: number;

  constructor(private universityService: UniversityService, private tlist: UniversitiesComponent,
              private feedbackService: FeedbackService, private route: ActivatedRoute,
              private router: Router){
  }

  ngOnInit() {
      this.getUniversity();
      this.feedbackService.getAllFeedbacksByUniversityId(this.universityId).subscribe(res => {
          console.log(this.universityId);
          this.feedbacks = res;
      });
  }

  getUniversity() {

      this.universityId = +this.route.snapshot.params.id;
      // let teacherId = parseInt(this.route.snapshot.paramMap.get('{teacherId}'));
      console.log(this.universityId);
      this.universityService.showUniversityPage(this.universityId)
          .subscribe(university => {
              console.log(this.universityId);
              this.university = university;
          });
  }
}
