import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/service/alert.service';
import { CommentCreateDTO } from 'src/app/model/commentCreateDTO.model';
import { CommentService } from 'src/app/service/comment.service';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class TeamQuestionCommentComponent implements OnInit {

    newComment: CommentCreateDTO;

    @Input() answerId: number;
    @Output() commentEvent = new EventEmitter<Comment>();

    constructor(private commentService: CommentService, private router: Router, private alertService: AlertService) {
        this.newComment = new CommentCreateDTO();
    }

    ngOnInit(): void {
    }

    onSubmit() {

        this.commentService.createComment(this.newComment, this.answerId)
            .subscribe(result => {
                this.commentEvent.emit(result);
                this.newComment.body = "";
            });
    }

}