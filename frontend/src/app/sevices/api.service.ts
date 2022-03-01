import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  postDetails(data:any){
      return this.http.post<any>(environment.api_url+"/?",data);
  }
  getDetails(){
    return this.http.get<any>(environment.api_url,);
  }
  putDetails(data:any,id:any){
    return this.http.put<any>(environment.api_url+"/"+id,data);
  }
  deleteDetails(id:number){
    return this .http.delete<any>(environment.api_url+"/"+id);
  }
}
