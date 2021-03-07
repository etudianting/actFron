import { DomaineService } from './../../../services/domaine.service';
import { Component, OnInit } from '@angular/core';
import { Actu } from '../../../models/Actu';
import { Router } from '@angular/router';
import { ActuService } from './../../../services/actu.service';
import {Domaine} from '../../../models/Domaine';
import { ReturnStatement } from '@angular/compiler';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  constructor( private actualiteService : ActuService,private domaineService : DomaineService,  private router: Router) { }

  public data: any;
  entites;
  domaines: any = [] ;
  actua: Actu = new Actu();
  doms : Domaine[] = [];
  selectedValue=null;
  id_dom=null
  ngOnInit(): void {
    this.OngetAllDomaines();
  }

  saveActualite() {
    // console.log('-----------------------------entite: ', this.entite);
    console.log(this.findIdBydomName(this.selectedValue));
     this.actualiteService.saveActualite(this.findIdBydomName(this.selectedValue),this.actua)
     
       .subscribe(data => {
         alert("Vous avez enregistrez l'actualité : " + this.actua.titreAct);
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
      data.forEach(item=>{
        var dom = new Domaine();
        dom.id_dom = item.id_dom;
        dom.titreDom=item.titreDom;
        this.doms.push(dom);
      });
      console.log(this.doms);
    
      console.log(' searchedData ', this.domaines);
    }
    , error => {
      console.log('error', error);
    });


  }

 findIdBydomName(domname : string){
  return this.doms.filter(e=>e.titreDom == domname)
         .map(e=>e.id_dom)

 }
  

  
  
}


