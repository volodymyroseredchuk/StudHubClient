import {Component, OnInit} from '@angular/core';
import {User} from '../model/user.model';
import {UserService} from '../service/user.service';
import {QuestionForListDTO} from '../model/questionForListDTO.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: User;
  questions: QuestionForListDTO[];

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(res => {
      this.user = res;
    });
    this.userService.getAllQuestionsByUser().subscribe(res => {
      this.questions = res;
    });

  }

}


