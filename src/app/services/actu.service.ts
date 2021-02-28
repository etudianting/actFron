import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

const AUTH_API = 'http://localhost:8090/api/actu/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ActuService {


  options : object;
   
  constructor(private http: HttpClient) { 
    let optionHeaders: HttpHeaders = new HttpHeaders({'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
    this.options = {headers:optionHeaders}
  }
  


 // POST REQUEST
 public saveActualite(body): Observable<any> {
  return this.http.post(AUTH_API +'actualites', body);
}



}
