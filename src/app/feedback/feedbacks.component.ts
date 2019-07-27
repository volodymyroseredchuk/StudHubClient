import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {FeedbackService} from '../service/feedback.service';
import {TeacherService} from '../service/teacher.service';
import {UniversitiesComponent} from '../universities/universities.component';
import {UniversityService} from '../service/university.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.scss']
})
export class FeedbacksComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  myControl = new FormControl();
  public feedbacks = [];
  filteredFeedbacks: Observable<string[]>;
  teacherId: number;
  universityId: number;

  constructor(private router: Router, private feedbackService: FeedbackService,
              private teacherService: TeacherService, private universityService: UniversityService,
              private activRouter: ActivatedRoute) { }

  ngOnInit() {

    // this.feedbackService.getAllFeedbacks().subscribe(data => this.feedbacks = data);
    this.feedbackService.getAllFeedbacksByTeacherId(this.teacherId).subscribe(data => this.feedbacks = data);
    this.feedbackService.getAllFeedbacksByUniversityId(this.universityId).subscribe(data => this.feedbacks = data);

  }

  // Reset the input value
  if(input) {
    input.value = '';
  }


  refresh() {
    // this.keywords = [];
    this.ngOnInit();
  }
}
