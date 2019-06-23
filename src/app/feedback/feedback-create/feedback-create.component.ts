import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Feedback} from "../../model/feedback.model";
import {FeedbackService} from "../../service/feedback.service";

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.scss']
})
export class FeedbackCreateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  feedback: Feedback;

  feedbackCreateForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(private feedbackService: FeedbackService, private router: Router, private formBuilder: FormBuilder) {
    this.feedback = new Feedback();
  }

  ngOnInit() {
    this.feedbackCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.feedbackCreateForm.controls; }

  goToAllFeedback() {
    this.router.navigate(['/feedback']);
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.feedbackCreateForm.invalid) {
      return;
    }

    this.feedbackService.createFeedback(this.feedback)
        .subscribe(result => this.goToAllFeedback());
  }
}


