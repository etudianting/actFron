import { ActuService } from './../../../services/actu.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  actualites;

  constructor( private actuService : ActuService ) { }

  ngOnInit() {


    this.getAllActu();
    this.actuService.getAllActu().subscribe(res => {
      console.log(res); 
      //this.dataSource.data = res["0"]["data"];


  });
  }

   getAllActu(){

    this.actuService.getAllActu().subscribe( data=> {  
  
      this.actualites=data;
    
    }
    , error => {
      console.log('error', error);
    });

   }

}
