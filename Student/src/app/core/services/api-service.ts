import { Injectable, NgModule } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, RequestOptions, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// models
import { StdlistForm } from '../models/stdlist.model';

const devUrl = 'http://192.168.3.17:3005';
// const devUrl = 'http://localhost:3005';


// const useraccess_token = localStorage.getItem('token');

const httpOptions = {
    headers: new Headers({ 'Authorization': localStorage.getItem('token') || '' })
};

const httpOptionss = {
    headers: new Headers({ 'Content-Type': 'application/json;charset=utf-8'})
};

const httpOptionsClient = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8'})
};

const httpOptionsClients = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json/form-data;charset=utf-8' })
};



@NgModule({ providers: [ApiService] })
@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(private http: Http, private httpclient: HttpClient) {

    }
    liststudents() {
       // console.log("apiservce");
        return this.httpclient.get(devUrl + '/list_students', httpOptionsClients);
    }
    deletestudents(usn,isactive){
        return this.httpclient.delete(devUrl + '/delete_student/'+usn+'/'+isactive,httpOptionsClients);
    }
    addstudents(formData){
       // console.log("appdata");
        return this.http.post(devUrl + '/add_student/', formData ,httpOptions);
    }
    updatestudent(StdlistForm : StdlistForm){
        return this.httpclient.post(devUrl + '/update_student/'+ StdlistForm.usn, StdlistForm ,httpOptionsClient);
    }

    getstudent(usn){
        return this.httpclient.get(devUrl + '/get_student/'+ usn, httpOptionsClients);

    }
}  