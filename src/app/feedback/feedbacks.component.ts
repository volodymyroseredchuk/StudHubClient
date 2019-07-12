import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {FeedbackService} from '../service/feedback.service';

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

  constructor(private router: Router, private service: FeedbackService, private activRouter: ActivatedRoute) { }

  ngOnInit() {

    this.service.getAllFeedbacks().subscribe(data => this.feedbacks = data);

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
