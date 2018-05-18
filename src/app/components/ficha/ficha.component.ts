import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { FormService } from '../../services/servicios.service';



@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {

  subscription;
  workingInformation: JSON;


  constructor(private http : HttpClient, private FormsService: FormService ) { }

  ngOnInit() {
  }

  // Funcion para cargar toda la informacion del paciente seleccionado incluyendo los valores si ya tenia una atencion medica incompleta.
  cargarDatos(currentEmployee){
    
    localStorage.setItem('employee', JSON.stringify(currentEmployee));
    this.subscription = this.FormsService.trabajadoresInfo(currentEmployee.id).subscribe( 
      data => {
        for(let datos of data['results']){
          this.workingInformation = datos;
          localStorage.setItem('workingInformation', JSON.stringify(datos));
        }          
      },
      error => {
          console.log(<any>error);
      }
    );
   
  }


}
