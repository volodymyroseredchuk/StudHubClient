import { Component, OnInit } from '@angular/core';
import { Proposal } from 'src/app/model/proposal.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProposalService } from 'src/app/service/proposal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-proposals-create',
  templateUrl: './proposals-create.component.html',
  styleUrls: ['./proposals-create.component.scss']
})
export class ProposalsCreateComponent implements OnInit {

  taskId: number;
  proposal: Proposal = new Proposal();
  proposalCreateForm: FormGroup;
  submitted = false;

  constructor(private proposalService: ProposalService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.taskId = +this.route.snapshot.params.id;

    this.proposalCreateForm = this.formBuilder.group({
      body: ['', Validators.required],
      executionTerm: ['', Validators.required],
      price: ['', Validators.required]
    })
  }

  // convenience getter for easy access to form fields
  get f() { return this.proposalCreateForm.controls; }

  goToTask() {
    this.router.navigate(['/tasks', this.taskId]); 
  }

  onSubmit(){
    this.submitted = true;

    // stop here if form is invalid
    if (this.proposalCreateForm.invalid) {
          return;
    }

    this.proposalService.createProposal(this.taskId, this.proposal)
      .subscribe(result => {
        this.goToTask();
      })  
  }

  goBack(): void {
    this.location.back();
  }
}
