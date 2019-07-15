import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ResultSubmission } from '../model/result-submission.model';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: Order;

  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  user: User;
  fileToUpload: File = null;

  constructor(private orderService:OrderService, private route: ActivatedRoute,
     private router: Router, private fb: FormBuilder, private cd: ChangeDetectorRef,
     private userService: UserService) { }

  ngOnInit() {
    this.getOrder()
    this.getUser()
  }
  getOrder() {
    const id = +this.route.snapshot.params.id;
    this.orderService.getOrder(id).subscribe(
      order => {
        this.order = order;
      },
      error => {
        alert(error);
        console.log(error);
        this.router.navigate([""]);

      }
    )
  }


  //Currently logged in user
  getUser() {
    this.userService.getUser().subscribe(
      user => {
        this.user = user;
      }, () => {
        this.user = null;
      }
    )
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.fileToUpload = event.target.files.item(0);
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  submitResult(){
    this.orderService.submitResult(this.fileToUpload, this.order.id).subscribe(
      resultSubmission => {this.order.resultSubmission = resultSubmission}
    )
  }

  isTaskInProgress(){
    console.log(this.order.task)
    if(this.order.task.status.toUpperCase() == "IN_PROGRESS"){
      return true;
    }
    return false;
  }

  isTaskDone(){
    if(this.order.task.status.toUpperCase() == "DONE"){
      return true;
    }
    return false;
  }

  isUserExecutor(){
    if(!this.user){
      return false;
    }
    if(this.user.username == this.order.proposal.user.username){
      return true;
    }
    return false;
  }

  isUserTaskCreator(){
    if(!this.user){
      return false;
    }
    if(this.user.username == this.order.task.user.username){
      return true;
    }
    return false;
  }


}
