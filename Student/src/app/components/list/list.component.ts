import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { ApiService } from 'src/app/core/services/api-service';
import { Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})


export class ListComponent implements OnInit {
  table = true;
  display = 'none';
  public student;
  public std;
  displayedColumns = ['usn', 'name', 'email','age','img','state','action'];
  dataSource: any;
  status = false;
  editform = false;
  editstudentForm : FormGroup;
  constructor(private _apiService: ApiService, private formBuilder: FormBuilder, private router: Router) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    //console.log("init");
    this.liststudent();

    this.editstudentForm = this.formBuilder.group({
      usn: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
    });
  }
  // get student

  liststudent() {
    //console.log("iam here");
    this._apiService.liststudents().subscribe(
      res => {
        //console.log(res);
        this.student = res;
        if (this.student.statuscode == 200) {
          this.dataSource = new MatTableDataSource(); 
          this.dataSource.data = this.student.data;
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        }
      },
      err => console.error(err)
    );
  }


  deletestudent(usn, isactive) {
   // console.log("inside delete");
    if (usn) {
      this._apiService.deletestudents(usn,isactive).subscribe( 
        res =>{
          console.log("user deleted successful");
          window.location.replace(' '); 
          
        }
      )
    }
  }

  // edit category

  editstudent(std) {
    this.std = std;
    this.table = false;
    this.editform = true;
    //console.log("edit");
    this.editstudentForm.setValue({
      usn: this.std.usn,
      name: this.std.name,
      email: this.std.email,
      age: this.std.age,
      
    });
    //console.log("edit1");
  }

  onCloseHandled() {
    // this.display = 'none';
    this.table = true;
    this.editform = false;

  }

  // update campaign
  onUpdate() {
    //console.log("update");
    if (this.editstudentForm.valid) {
      this._apiService.updatestudent(this.editstudentForm.value).subscribe((data: any) => {
        //this.getstudent(this.usn);
        this.onCloseHandled();
        if (data.statuscode == 200) {
          console.log("success");
          window.location.replace(' '); 
        } 
         
      });
    }
  }
}
