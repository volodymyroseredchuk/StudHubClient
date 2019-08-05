import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {University} from '../../model/university.model';
import {UniversityService} from '../../service/university.service';
import {Observable} from 'rxjs';
import {FileService} from '../../service/file.service';

@Component({
    selector: 'app-universities-create',
    templateUrl: './universities-create.component.html',
    styleUrls: ['./universities-create.component.scss']
})
export class UniversitiesCreateComponent implements OnInit {

    university: University;
    fileData: File = null;
    imgURL: any;
    private universities: University[];
    options: string[];
    filteredOptions: Observable<string[]>;
    myControl = new FormControl();

    universityForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        mark: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)])
    });
    // loading = false;
    // submitted = false;

    constructor(
        private fileService: FileService,
        private universityService: UniversityService,
        private router: Router,
        // private formBuilder: FormBuilder
    ) {
    }

    ngOnInit() {
        // this.universityForm = this.formBuilder.group({
        //     name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        //     city: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        //     mark: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)])
        // });
        // this.getUniversities();
    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
    }

    get f() {
        return this.universityForm.controls;
    }

    async onSubmit(f: NgForm) {
        if (f.value.name.length < 3 || f.value.city.length < 3) {
            return;
        }
        console.log(f);
        this.university = new University();
        this.university.name = f.value.name;
        this.university.city = f.value.city;
        this.university.mark = f.value.mark;
        console.log(this.university);
        await this.setImageUrl();
        this.createUniversity(this.university);
    }

    async setImageUrl() {
        console.log(this.fileData);
        if (this.fileData) {
            await this.fileService.uploadFile(this.fileData).toPromise().then(res => {
                console.log(res);
                this.university.imageUrl = res.message;
            });
        } else {
            this.university.imageUrl = 'https://res.cloudinary.com/studhubcloud/image/upload/v1565018471/uni-mobile-default-min_zitpda.png';
        }
    }

    async createUniversity(university: University) {
        await this.universityService.newUniversity(this.university).subscribe(res => {
            console.log(res);
            this.router.navigate(['/universities']);
        });
    }


    onChange(event) {
        this.fileData = event.target.files[0];
        const mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
            alert('Only images are supported');
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = () => {
            this.imgURL = reader.result;
        };
    }
}
