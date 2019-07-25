import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ApiService } from 'src/app/core/services/api-service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  
  public createprofile;
  public image;

  @ViewChild('fileInput') fileInput: ElementRef;
  createForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private _apiService: ApiService, private router: Router) { }


  ngOnInit() {
    this.createForm = this.formBuilder.group({
      usn: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
    });
  }

  fileChange(e) {
    const image = e.target.files;
    this.createprofile = image;
  }

  get f() { return this.createForm.controls; }

  // update profile

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.createForm.valid) {
      const formData: FormData = new FormData();
      //console.log("data",this.createForm.value);
      formData.append('usn', this.createForm.value.usn);
      formData.append('name', this.createForm.value.name);
      formData.append('email', this.createForm.value.email);
      formData.append('age', this.createForm.value.age);
      if (this.createprofile) {
        const file: File = this.createprofile[0];
        formData.append('image', file);
      } else {
        formData.append('image', '');
      }
      //console.log(formData);
      this._apiService.addstudents(formData).subscribe((data: any) => {
        if (data.statuscode = 200) {
          console.log("success");
          window.location.replace('');
        } else {
          console.log("fail");
        }
      });
    }
  }

}
