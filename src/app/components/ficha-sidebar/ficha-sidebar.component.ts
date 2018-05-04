import { Component, OnInit, Input } from '@angular/core';
import { NuevaAtencionComponent } from '../nueva-atencion/nueva-atencion.component';
import { FormService } from '../../services/servicios.service';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-ficha-sidebar',
  templateUrl: './ficha-sidebar.component.html',
  styleUrls: ['./ficha-sidebar.component.scss'],
  providers:[FormService]
})
export class FichaSidebarComponent implements OnInit {

  @Input() parentMessage: string;
  emailTrabajo: string;
  departamento: string;
  cargo: string;
  phone_office: string;

  constructor(private http : HttpClient, private FormsService: FormService) { }

  ngOnInit() {
  }

   //obtener id trabajador seleccionado
   obtenerId(idSeleccionado){
    console.log(idSeleccionado.id)
    this.FormsService.trabajadoresInfo(idSeleccionado.id).subscribe( 
      data => {
        //this.trabajador.push(data);
        //console.log(this.trabajador);
        this.emailTrabajo = data['results'][0].email_office
        this.departamento = data['results'][0].department
        this.cargo = data['results'][0].position
        this.phone_office = data['results'][0].phone_office
    
      },
      error => {
          console.log(<any>error);
      }
    );
  }

}
