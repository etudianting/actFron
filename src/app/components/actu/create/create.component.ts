import { DomaineService } from './../../../services/domaine.service';
import { Component, OnInit } from '@angular/core';
import { Actu } from '../../../models/Actu';
import { Router } from '@angular/router';
import { ActuService } from './../../../services/actu.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor( private actualiteService : ActuService,private domaineService : DomaineService,  private router: Router) { }

  public data: any;
  entites;
  public domaines: any = [];
  actua: Actu = new Actu();

  ngOnInit(): void {
    this.OngetAllDomaines();
  }


  saveActualite() {
    // console.log('-----------------------------entite: ', this.entite);
     this.actualiteService.saveActualite(this.actua)
       .subscribe(data => {
         alert("Vous avez enregistrez l'actualité : " + data.titre);
         console.log(data)
         if (localStorage.getItem('actualiteToUpdate')) {
           localStorage.removeItem('actualiteToUpdate');
         }
         this.router.navigate(['/actualites/list']);
       }, error => {
         console.log(error)
       })
       console.clear
       console.log(this.actua)
   }
  

   OngetAllDomaines(){
    this.domaineService.getAllDomaine().subscribe( data=> {  
  
      this.domaines =data;
    
      console.log(' searchedData ', this.domaines);
    }
    , error => {
      console.log('error', error);
    });


  }
}


