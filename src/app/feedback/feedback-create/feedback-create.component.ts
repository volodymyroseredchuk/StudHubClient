import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Feedback} from '../../model/feedback.model';
import {FeedbackService} from '../../service/feedback.service';
import {MatChipInputEvent} from '@angular/material';

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

    constructor(private feedbackService: FeedbackService, private router: Router, private formBuilder: FormBuilder,
                private route: ActivatedRoute) {
        this.feedback = new Feedback();
    }

    ngOnInit() {
        this.feedbackCreateForm = this.formBuilder.group({
            body: ['', Validators.required],
            mark: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() {
        return this.feedbackCreateForm.controls;
    }

    addMark(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;
    }

    onSubmit() {
        const teacherId = +this.route.snapshot.params.id;
        this.submitted = true;

        // stop here if form is invalid
        if (this.feedbackCreateForm.invalid) {
            return;
        }
        this.feedback.teacherId = teacherId;
        this.feedbackService.createFeedback(this.feedback)
            .subscribe(result => this.router.navigate(['/teachers', teacherId]));
    }
}
