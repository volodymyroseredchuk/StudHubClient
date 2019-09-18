import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {University} from '../../model/university.model';
import {UniversityService} from '../../service/university.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FileService} from '../../service/file.service';
import {TeacherService} from '../../service/teacher.service';
import {Teacher} from '../../model/teacher.model';

@Component({
    selector: 'app-teachers-create',
    templateUrl: './teachers-create.component.html',
    styleUrls: ['./teachers-create.component.scss']
})
export class TeachersCreateComponent implements OnInit {

    teacher: Teacher;
    fileData: File = null;
    imgURL: any;
    private universities: University[];
    private selectedUniversityName: 'None';
    private selectedUniversity: University;
    options: string[];
    filteredOptions: Observable<string[]>;
    myControl = new FormControl();

    teacherForm = new FormGroup({
        firstname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
        mark: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)])
    });

    constructor(
        private fileService: FileService,
        private teacherService: TeacherService,
        private universityService: UniversityService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.getUniversities();
    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
    }

    get f() {
        return this.teacherForm.controls;
    }

    async onSubmit(f: NgForm) {
        if (f.value.firstname.length < 3 || f.value.lastname.length < 3) {
            return;
        }
        console.log(f);
        this.teacher = new Teacher();
        this.teacher.firstName = f.value.firstname;
        this.teacher.lastName = f.value.lastname;
        this.teacher.mark = f.value.mark;
        if (this.selectedUniversity !== undefined) {
            this.teacher.university = this.selectedUniversity;
        }
        console.log(this.teacher);
        await this.setImageUrl();
        this.createTeacher(this.teacher);
    }

    async setImageUrl() {
        console.log(this.fileData);
        if (this.fileData) {
            await this.fileService.uploadFile(this.fileData).toPromise().then(res => {
                console.log(res);
                this.teacher.imageUrl = res.message;
            });
        } else {
            this.teacher.imageUrl = 'https://res.cloudinary.com/studhubcloud/image/upload/v1563131695/teacher7_dr0owq.jpg';
        }
    }

    async createTeacher(teacher: Teacher) {
        await this.teacherService.newTeacher(this.teacher).subscribe(res => {
            console.log(res);
            this.router.navigate(['/teachers']);
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

    async getUniversities() {
        this.options = [];
        await this.universityService.getAllUniversities().toPromise().then(data => {
            console.log(data);
            this.universities = data;
        }).then(() => {
            this.universities.forEach(university => {
                this.options.push(university.name);
            });
        }).then(() => {
            this.filteredOptions = this.myControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filter(value))
                );
        });
    }

    getUniverFromName(option: string) {
        this.selectedUniversity = this.universities.find(university => {
            return university.name === option;
        });
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

}
