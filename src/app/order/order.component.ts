import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../model/order.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { ResultSubmission } from '../model/result-submission.model';
import { UserService } from '../service/user.service';
import { User } from '../model/user.model';
import { ChatService } from '../service/chat.service';
import { FreelancerDTO } from '../model/freelancerDTO.model';
import { CustomerDTO } from '../model/customerDTO.model';
import { MatSnackBar } from '@angular/material';
import { FileService } from '../service/file.service';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  order: Order;
  display: boolean = true;
  formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  freelancer: FreelancerDTO = new FreelancerDTO();
  customer: CustomerDTO = new CustomerDTO();
  formFreelancer = new FormGroup({
    quality: new FormControl(''),
    price: new FormControl(''),
    velocity: new FormControl(''),
    contact: new FormControl('')
  });
  formCustomer = new FormGroup({
    payment: new FormControl(''),
    formulation: new FormControl(''),
    clarity: new FormControl(''),
    contact: new FormControl('')
  });

  rating = 0;
  user: User;
  fileToUpload: File = null;
  chatId: number;

  constructor(private orderService: OrderService,
    private _snackBar: MatSnackBar, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder, private cd: ChangeDetectorRef,
    private userService: UserService, private chatService: ChatService,
    private fileService: FileService, private http: HttpClient) { }

  ngOnInit() {
    this.getOrder()
    this.getUser()
  }

  onSubmitFreelancer() {
    console.log(this.freelancer);

    if (!this.freelancer.quality || !this.freelancer.price || !this.freelancer.velocity
      || !this.freelancer.contact) {
      alert("Choose all critery");
      return;
    }
    this.userService.rateFreelancer(this.freelancer, this.order.id)
      .subscribe(res => {
        this.display = false;
        this._snackBar.open("feedback has been successfully sent", "OK", {
          duration: 15000,
        });
      })
  }

  onSubmitCustomer() {
    console.log(this.customer);

    if (!this.customer.payment || !this.customer.formulation || !this.customer.clarity
      || !this.customer.contact) {
      alert("Choose all critery");
      return;
    }

    this.userService.rateCustomer(this.customer, this.order.id)
      .subscribe(res => {
        this.display = false;
        this._snackBar.open("feedback has been successfully sent", "OK", {
          duration: 15000,
        });
      })
  }

  getOrder() {
    this.rating = 2.7;
    const id = +this.route.snapshot.params.id;
    this.orderService.getOrder(id).subscribe(
      order => {
        this.order = order;
        console.log(this.order);
        this.chatService.createChat(this.order.task.user.id, this.order.proposal.user.id)
          .subscribe(
            chatId => {
              console.log(chatId)
              this.chatId = chatId
              console.log(chatId)
            }

          )

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
    this.userService.getCurrentUser().subscribe(
      user => {
        this.user = user;
      }, () => {
        this.user = null;
      }
    )
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
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

  submitResult() {
    console.log(this.fileToUpload)
    if(this.fileToUpload.size > 1024 * 1024 * 4 ) {
      alert("The file is too big!(Over 4MB)");
      return;
    }
    var fileRegExp = /.*\.(gif|jpe?g|bmp|png|pdf)$/;
    if(!fileRegExp.test(this.fileToUpload.name)){
      alert("This file type is not supported!"); 
      return;
    }
    
    this.fileService.uploadFile(this.fileToUpload).subscribe(
      fileUrlObject => {
        this.orderService.submitResult(fileUrlObject.message, this.order.id).subscribe(
          resultSubmission => {
            this.order.resultSubmission = resultSubmission
            this.order.task.status = "DONE"
          }
    
        )
      }
    )
    
  }

  downloadFile() {
    let fixedUrl = this.fixUrl(this.order.resultSubmission.fileUrl)
    return this.http.get<Blob>(fixedUrl,{
        responseType: 'blob' as 'json'
      })
      .subscribe(res => {
        console.log('start download:',res);
        var blob = new Blob([res], { type: "application/pdf"})
        var url = window.URL.createObjectURL(res);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = fixedUrl.slice(fixedUrl.lastIndexOf("/") + 1);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      }, error => {
        console.log('download error:', JSON.stringify(error));
      }, () => {
        console.log('Completed file download.')
      });
  }

  fixUrl(url: String):string{
    if(url[4] !== "s"){
      return url.replace("http", "https");
    }
  }



  cancelOrder() {
    this.orderService.cancelOrder(this.order.id).subscribe(
      order => {
        this.order = order;
        console.log(order);
      }
    )
  }

  isTaskInProgress() {
    if (this.order.task.status.toUpperCase() == "IN_PROGRESS") {
      return true;
    }
    return false;
  }

  isTaskDone() {
    if (this.order.task.status.toUpperCase() == "DONE") {
      return true;
    }
    return false;
  }

  isUserExecutor() {
    if (!this.user) {
      return false;
    }
    if (this.user.username == this.order.proposal.user.username) {
      return true;
    }
    return false;
  }

  isUserTaskCreator() {
    if (!this.user) {
      return false;
    }
    if (this.user.username == this.order.task.user.username) {
      return true;
    }
    return false;
  }


}
