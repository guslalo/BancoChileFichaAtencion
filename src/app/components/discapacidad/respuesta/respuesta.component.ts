import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../services/servicios.service';

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.scss']
})
export class RespuestaComponent implements OnInit {
  workingInformation: JSON;
  subscription;


  constructor(private FormsService: FormService) { }

  ngOnInit() {
    if (localStorage.getItem("workingInformation")) {
      this.workingInformation = JSON.parse(localStorage.getItem("workingInformation"));
    }
    
    this.subscription = this.FormsService.getFormulario('nueva-atencion').subscribe( 
      data => {
        let stringToHtml = '';
        if (localStorage.getItem("medicalAttention")) {
          let medicalAttention: JSON;
          medicalAttention = JSON.parse(localStorage.getItem("medicalAttention"));
          this.loadValuesForm(medicalAttention['patient']);
        }
      },
      error => {
        console.log(<any>error);
      }
    );   
  }
loadValuesForm(id){
    this.subscription = this.FormsService.getElementsValues(id).subscribe( 
      data => {
        let element
        for(let son of data){
          element = document.getElementById(son.attribute['id_element'])
          element.value = son.value
        }
      },
      error => {
          console.log(<any>error);
      }
    );
  }
  cargarDatos(currentEmployee){
    localStorage.setItem('employee', JSON.stringify(currentEmployee));
    this.subscription = this.FormsService.trabajadoresInfo(currentEmployee.id).subscribe( 
      data => {
        for(let datos of data['results']){
          this.workingInformation = datos;
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
    this.loadValuesForm(currentEmployee.id)  
  }


}
