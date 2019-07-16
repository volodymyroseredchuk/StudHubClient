import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentCreateDTO } from 'src/app/model/commentCreateDTO.model';
import { CommentService } from 'src/app/service/comment.service';
import { Location } from '@angular/common';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

    newComment: CommentCreateDTO;
    public editor = ClassicEditor;

    @Input() answerId: number;
    @Output() commentEvent = new EventEmitter<Comment>();

    constructor(private commentService: CommentService, private location: Location) {
        this.newComment = new CommentCreateDTO();
    }

    ngOnInit(): void {
    }

    onSubmit() {

        this.commentService.createComment(this.newComment, this.answerId)
            .subscribe(result => {
                this.commentEvent.emit(result);
                this.newComment.body = "";
                console.log(result);
            });

    }
}