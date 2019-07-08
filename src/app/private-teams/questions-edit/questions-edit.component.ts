import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/service/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/model/question.model';
import { Tag } from 'src/app/model/tag.model';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-questions-edit',
  templateUrl: './questions-edit.component.html',
  styleUrls: ['./questions-edit.component.scss']
})
export class TeamQuestionsEditComponent implements OnInit {

  question: Question;
  newQuestion: Question;
  tags: Tag[] = [];
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  questionCreateForm: FormGroup;
  loading = false;
  submitted = false;
  teamId;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private questionService: QuestionService, private router: Router,
    private location: Location, private route: ActivatedRoute,
    private formBuilder: FormBuilder) {

    this.question = new Question();
    this.newQuestion = this.question;
  }

  ngOnInit(): void {
    this.questionCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });
    this.route.params.subscribe(params => {
      this.teamId = params['id'];
    });
    this.getQuestion();
    this.newQuestion = this.question;
  }

  // convenience getter for easy access to form fields
  get f() { return this.questionCreateForm.controls; }

  getQuestion() {
    const id = +this.route.snapshot.params.id;
    this.questionService.showQuestionPage(id)
      .subscribe(question => {
        this.question = question;
        this.tags = question.tagList;
      });
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add tag
    if ((value || '').trim()) {
      this.tags.push({ id: 0, name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  goBack() {
    this.location.go("/teams/" + this.teamId);
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.questionCreateForm.invalid) {
      return;
    }
    this.question.tagList = this.tags;
    this.questionService.editQuestion(this.question.id, this.question)
      .subscribe(result => this.goBack());
  }
}