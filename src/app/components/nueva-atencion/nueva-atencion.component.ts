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


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { validateConfig } from '@angular/router/src/config';

import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateAssetModalComponent } from '../../components/modal/modal.component';

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
  workingInformation: JSON;
  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);


  constructor(
    private http : HttpClient, 
    private FormsService: FormService, 
    private sanitizer: DomSanitizer, 
    private router: Router,
    private modal: NgbModal) {
    
  }

  onClick() {
    this.modal.open(CreateAssetModalComponent);
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

  // Funcion para cargar toda la informacion del paciente seleccionado incluyendo los valores si ya tenia una atencion medica incompleta.
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

  loadValuesForm(id){
    $(".formNuevaAtencion").find(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio, .cargarDatos').val('');
    $(".formNuevaAtencion").find(':checkbox, :radio').prop('checked', false);
    this.subscription = this.FormsService.getElementsValues(id).subscribe( 
      data => {
        let element
        for(let son of data){
          element = document.getElementById(son.attribute['id_element'])
          if(son.value && son.value != "" && element ){
            element.value = son.value
          }
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
      $(".switch").change(function(){
        //toggle class checked general
        $(this).toggleClass("checked");
        //caso discapacidad
        if($("#discapacidad-inline input").is(":checked")){
          $('#nueva-btn-completar-discapacidad, .elementDis input, .elementDis select, .elementDis textarea').prop("disabled",false);
          $("#caso-social-inline .switch.checked").click();
          $(".elementDis, .elementComun").show();
          $(".elementAtencion").hide();

        }else{
          $('#nueva-btn-completar-discapacidad, .elementDis input, .elementDis select, .elementDis textarea').attr("disabled", 'disabled');
          $(".elementDis, .elementComun").hide();
        }
        //caso social
        if($("#caso-social-inline input").is(":checked")){
          $("#discapacidad-inline .switch.checked").click();
          $("#fila8 input, .btnAceptar, .elementAtencion input, .elementAtencion select, .elementAtencion textarea").prop("disabled", false);
          $(".elementComun, .elementAtencion").show();
        }else{
          $("#fila8 .switch.checked").click();
          $("#fila8 input, .btnAceptar, .elementAtencion input, .elementAtencion select, .elementAtencion textarea").attr("disabled", 'disabled');
          $(".elementAtencion").hide();
        }
      }); 
      //editar resumen
      $("#btn-resumen").click(function(){
        $("#parrafo-caso").prop("disabled",false).css("background","#e5f0f4").focus();
      });
    },0);
  }

  formPost(url) {
    this.loading = true;
    let employee: JSON;
    employee = JSON.parse(localStorage.getItem("employee"));
    let formulario = {
      patient: employee['id'],
      attention_date: $("#fecha-atencion").val(),
      attentionRequest: [],
      elements: $(".formNuevaAtencion").serializeArray(),
      files: []
    }

    this.FormsService.formPost(formulario).subscribe(
      (res) => {
        if(url == '/'){
          localStorage.removeItem('medicalAttention');
          localStorage.removeItem("workingInformation");
          localStorage.removeItem("employee");
          localStorage.removeItem("files");
          localStorage.removeItem("reporte");
        }else{
          localStorage.setItem('medicalAttention', JSON.stringify(res));
        }
        this.router.navigate([url]);
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );
  }

}
