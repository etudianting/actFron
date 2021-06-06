import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Actu } from '../models/Actu';

const AUTH_API = 'http://localhost:8090/api/actu/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable({
  providedIn: 'root'
})
export class ActuService {


  options : object;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { 
    let optionHeaders: HttpHeaders = new HttpHeaders({'Accept': 'application/json','Content-Type':'application/json','Access-Control-Allow-Origin':'*'});
    this.options = {headers:optionHeaders}
  }
  

 // POST REQUEST
 public saveActualite(id_dom,body): Observable<any> {
  return this.http.post(AUTH_API +`${id_dom}`+'/actualites', body);
}


getAllActu():Observable<Actu[]>{

return this.http.get<Actu[]>(AUTH_API+ 'actualites',
  {headers: this.headers});
}


}
