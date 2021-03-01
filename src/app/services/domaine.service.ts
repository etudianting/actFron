import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Domaine } from '../models/Domaine';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8090/api'


@Injectable({
  providedIn: 'root'
})
export class DomaineService {


  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }



  getAllDomaine():Observable<Domaine[]>{


    
      return this.httpClient.get<Domaine[]>(API_URL+'/dom/domaines',
      {headers: this.headers});
    }
    


  }





