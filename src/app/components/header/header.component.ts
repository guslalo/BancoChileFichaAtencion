import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormService } from '../../services/servicios.service';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  subscription;
  model:any;
  constructor(private http : HttpClient, private FormsService: FormService,) {



   }

   search = (text$: Observable<string>) =>
   text$
     .debounceTime(200)
     .distinctUntilChanged()
     .do((text) => console.log())
     .switchMap(term =>
       this.FormsService.getEmployeesList(term)  
     );
   formatter = (x: {rut: string, check_digit:string}) => x.rut + '-' + x.check_digit;

  ngOnInit() {
    
       
  }

    // Funcion para cargar toda la informacion del paciente seleccionado incluyendo los valores si ya tenia una atencion medica incompleta.
    cargarDatos(currentEmployee){
    
      localStorage.setItem('employee', JSON.stringify(currentEmployee));
      this.subscription = this.FormsService.trabajadoresInfo(currentEmployee.id).subscribe( 
        data => {
          for(let datos of data['results']){
            //this.workingInformation = datos;
            localStorage.setItem('workingInformation', JSON.stringify(datos));
          } 
          $("form.formNuevaAtencion *").prop("disabled",false);  
          $("#nueva-btn-completar-discapacidad").attr("disabled", 'disabled');
          $("#fila8 input").attr("disabled", 'disabled');  
          $(".btnAceptar").attr("disabled", 'disabled');
          $("#parrafo-caso").attr("disabled", 'disabled');            
        },
        error => {
            console.log(<any>error);
        }
      );
    }


}
