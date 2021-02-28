import { Component, OnInit } from '@angular/core';
import { Actu } from '../../../models/Actu';
import { Router } from '@angular/router';
import { ActuService } from 'src/app/services/actu.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor( private actualiteService : ActuService,  private router: Router) { }

  public data: any;
  entites;
  actua: Actu = new Actu();

  ngOnInit(): void {
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






}
