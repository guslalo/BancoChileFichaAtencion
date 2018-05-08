import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { FormService } from '../../services/servicios.service';
import HtmlTreeService from '../../services/html-tree.service';
import { Dynamic_Form } from '../../models/dynamic_form';
import { Dynamic_Element, Trabajador } from '../../models/dynamic_form';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { Post } from '../../models/form_post';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { formPostElement } from '../../models/forms';
import { validateConfig } from '@angular/router/src/config';

import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

var trabajadores;

@Component({
  selector: 'app-nueva-atencion',
  templateUrl: './nueva-atencion.component.html',
  styleUrls: ['./nueva-atencion.component.scss'],
  providers:[FormService],
  encapsulation: ViewEncapsulation.Emulated
})

export class NuevaAtencionComponent implements OnInit {
  MyForm: SafeHtml;
  subscription;
  model: any;
  employee: Array<any>;

  workingInformation: JSON;

  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer, private router: Router) {

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

  public id:number;

  ngOnInit() {
    if (localStorage.getItem("workingInformation")) {
      this.workingInformation = JSON.parse(localStorage.getItem("workingInformation"));
    }
    this.subscription = this.FormsService.getFormulario('nueva-atencion').subscribe( 
      data => {
        this.isLoading = false;
        this.loadingComplete = true;
      
        let stringToHtml = '';
        for(let form of data['results']){
          stringToHtml = HtmlTreeService.buildForm(form);  
        }
        this.MyForm = this.sanitizer.bypassSecurityTrustHtml(
          stringToHtml
        )
        this.setTime(data['results']);       
      },
      error => {
         console.log(<any>error);
      }
    ); 
  }

  // Funcion para cargar toda la informacion del paciente seleccionado incluyendo los valores si ya tenia una atencion medica incompleta.
  cargarDatos(currentEmployee){
    this.employee = currentEmployee;
    this.subscription = this.FormsService.trabajadoresInfo(currentEmployee.id).subscribe( 
      data => {
        for(let datos of data['results']){
          this.workingInformation = datos;
          localStorage.setItem('workingInformation', JSON.stringify(datos));
        } 
        $("form *").prop("disabled",false);     
      },
      error => {
        console.log(<any>error);
      }
    );

    this.subscription = this.FormsService.getElementsValues(currentEmployee.id).subscribe( 
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  //funcion para acceder al dom despues de mostrar data
  setTime(data){
  
    setTimeout(function(){
      //switch
      $(".switch").change(function(){
        $(this).toggleClass("checked");
        if(this == document.getElementById("nueva-switch-caso-social")){
          $(".switch.checked").click();
        }
        if(this == document.getElementById("nueva-label-grupo-switch-discapacidad")){
          $(".switch.checked").click();
          $('#nueva-btn-completar-discapacidad').prop("disabled",false);
          $(this).toggleClass("discapacidad-activo");
        }
        if(this == document.getElementById("nueva-label-grupo-switch-derivacion")){
          $(".switch.checked").click();
        }
        if(this == document.getElementById("nueva-label-grupo-switch-receta")){
          $(".switch.checked").click();
        }
        if(this == document.getElementById("nueva-label-grupo-switch-licencia")){
          $(".switch.checked").click();
        }
        if(this == document.getElementById("nueva-label-grupo-switch-orden")){
          $(".switch.checked").click();
        }
        $(".discapacidad-activo").on("click",function(){
          $('#nueva-btn-completar-discapacidad').attr("disabled");
        });
      });

      //editar resumen
      $("#btn-resumen").click(function(){
        $("#parrafo-caso").prop("disabled",false).css("background","#e5f0f4").focus();
      });

      $(".fichaAtencion form *").change(function(){
        let formCaptureElement = $(this).val();
      });

    },0);
  }


  //form post general
  formPost() {
    this.loading = true;
    
    let formulario = {
      patient: this.employee['id'],
      attention_date: $("#fecha-atencion").val(),
      attentionRequest: [],
      elements: $(".fichaAtencion form").serializeArray(),
    }

    this.FormsService.formPost(formulario).subscribe(
      (res:Response) => {
        // localStorage.setItem('medicalAttention', JSON.stringify(res));
        this.router.navigate(['/acreditacion-discapacidad']);
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );
  }

  //guardar y cerrar
  guardarCerrar() {
    let formulario = {
      patient: this.employee['id'],
      attention_date: $("#fecha-atencion").val(),
      attentionRequest: [],
      elements: $(".fichaAtencion form").serializeArray(),
    }
    this.FormsService.formPost(formulario).subscribe(
      (res:Response) => {
        this.router.navigate(['/']);
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );
  }


}
