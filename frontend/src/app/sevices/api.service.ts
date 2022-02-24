import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postDetails(data:any){
      return this.http.post<any>(" http://localhost:5000/api/v1/employees/?",data);
  }
  getDetails(){
    return this.http.get<any>(" http://localhost:5000/api/v1/employees",);
  }
  putDetails(data:any,id:any){
    return this.http.put<any>(" http://localhost:5000/api/v1/employees/"+id,data);
  }
  deleteDetails(id:number){
    return this .http.delete<any>(" http://localhost:5000/api/v1/employees/"+id);
  }
}
