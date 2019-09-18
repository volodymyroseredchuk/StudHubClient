import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {University} from '../../model/university.model';
import {UniversityService} from '../../service/university.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FileService} from '../../service/file.service';
import {Teacher} from '../../model/teacher.model';
import {TeacherService} from '../../service/teacher.service';

@Component({
    selector: 'app-teachers-edit',
    templateUrl: './teachers-edit.component.html',
    styleUrls: ['./teachers-edit.component.scss']
})
export class TeachersEditComponent implements OnInit {

    teacher: Teacher;
    teacherId: number;
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
        lastname: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
    });

    constructor(
        private fileService: FileService,
        private teacherService: TeacherService,
        private universityService: UniversityService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.teacherService.getTeacher(this.route.snapshot.params.id).subscribe(res => {
            console.log('consol loh in nginit' + this.route.snapshot.params.id);
            this.teacher = res;
            this.teacherForm.patchValue({
                firstname: res.firstName,
                lastname: res.lastName,
            });
        });

        this.getUniversities();
    }

    fileProgress(fileInput: any) {
        this.fileData = fileInput.target.files[0] as File;
    }

    get f() {
        return this.teacherForm.controls;
    }

    onSubmit(f: NgForm) {
        if (f.value.firstname.length < 3 || f.value.lastname.length < 3) {
            return;
        }

        this.teacher.firstName = f.value.firstname;
        this.teacher.lastName = f.value.lastname;
        if (this.selectedUniversity !== undefined) {
            this.teacher.university = this.selectedUniversity;
        }

        this.setImageUrl();
    }

    async setImageUrl() {
        await this.fileService.uploadFile(this.fileData).toPromise().then(res => {
            this.teacher.imageUrl = res.message;
        }).then(() => {
            this.teacherService.updateTeacher(this.teacher).subscribe(() =>
                this.router.navigate(['/teachers']));
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
