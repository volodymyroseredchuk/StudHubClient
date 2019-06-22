import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {User} from 'src/app/model/user.model';
import {FeedbackService} from "../../service/feedback.service";
import {Feedback} from "../../model/feedback.model";

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

  // tags: Tag[] = [];
  feedback: Feedback = this.feedbackMock();

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
  }

  feedbackMock(): Feedback {
    let feedback: Feedback = new Feedback();
    feedback.id = 0;
    // feedback.answerList = [];
    feedback.body = "templateBody";
    feedback.creationDate = new Date();
    // feedback.modifiedDate = null;
    feedback.title = "templateTitle";
    feedback.user = new User();
    feedback.user.id = 1;

    // feedback.tagList = this.tags;
    return feedback;
  }

  // addTag(event: MatChipInputEvent): void {
  //   const input = event.input;
  //   const value = event.value;
  //
  //   // Add tag
  //   if ((value || '').trim()) {
  //     this.tags.push({id:0, name: value.trim()});
  //   }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  // }

  // removeTag(tag: Tag): void {
  //   const index = this.tags.indexOf(tag);
  //
  //   if (index >= 0) {
  //     this.tags.splice(index, 1);
  //   }
  // }

  createFeedback() {
    this.feedbackService.createFeedback(this.feedbackMock())
      .subscribe(feedback => this.feedback = feedback);
  }
}
