import { OnInit, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentCreateDTO } from 'src/app/model/commentCreateDTO.model';
import { CommentService } from 'src/app/service/comment.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough';
import Code from '@ckeditor/ckeditor5-basic-styles/src/code';
import Subscript from '@ckeditor/ckeditor5-basic-styles/src/subscript';
import Superscript from '@ckeditor/ckeditor5-basic-styles/src/superscript';

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        plugins: [ Bold, Italic, Underline, Strikethrough, Code, Subscript, Superscript ],
        image: {
            toolbar: [ 'bold', 'italic', 'underline', 'strikethrough', 'code','subscript', 'superscript'  ]
        }
    } )


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

    constructor(private commentService: CommentService) {
        this.newComment = new CommentCreateDTO();
    }

    ngOnInit(): void {
    }

    onSubmit() {
        Array.from( this.editor.ui.componentFactory.names() );
        this.commentService.createComment(this.newComment, this.answerId)
            .subscribe(result => {
                this.commentEvent.emit(result);
                this.newComment.body = "";
            });
    }

}