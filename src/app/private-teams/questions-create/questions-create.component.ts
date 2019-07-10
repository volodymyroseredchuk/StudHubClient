import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/model/tag.model';
import { QuestionService } from 'src/app/service/question.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Question } from 'src/app/model/question.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TeamService } from 'src/app/service/team.service';
import { first } from 'rxjs/operators';
import { Location } from '@angular/common';
import { TeamQuestionService } from 'src/app/service/team-question.service';

@Component({
  selector: 'app-questions-create',
  templateUrl: './questions-create.component.html',
  styleUrls: ['./questions-create.component.scss']
})
export class TeamQuestionsCreateComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  private teamId;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  tags: Tag[] = [];
  question: Question;

  questionCreateForm: FormGroup;
  loading = false;
  submitted = false;
  private routeSub: Subscription;
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute, 
    private teamQuestionService: TeamQuestionService,
    private router: Router,
    private location: Location,
    private formBuilder: FormBuilder) {
    this.question = new Question();
  }

  ngOnInit() {
    this.questionCreateForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required]
    });

    this.teamId = +this.route.snapshot.params.id;
  }

  // convenience getter for easy access to form fields
  get f() { return this.questionCreateForm.controls; }

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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.questionCreateForm.invalid) {
      return;
    }

    this.question.tagList = this.tags;


    this.teamService.getTeam(this.teamId).toPromise().then(data => {
      this.question.team = data;
    }).then(() => {
      this.teamQuestionService.createQuestion(this.teamId, this.question)
        .subscribe(result => {
          console.log("create");
          console.log(this.question);
          this.goBack();
        });
    });

  }

  goBack(): void {
    this.router.navigate(["/teams/" + this.teamId]);
  }
}
