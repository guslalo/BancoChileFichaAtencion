import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { FormService } from '../../services/servicios.service';
import HtmlTreeService from '../../services/html-tree.service';
import { Dynamic_Form } from '../../models/dynamic_form';
import { Dynamic_Element, FormPostElement } from '../../models/dynamic_form';
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
  providers:[FormService]
})

export class NuevaAtencionComponent implements OnInit {


  MyForm: SafeHtml;
  subscription;
  model: any;
  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;
  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);


  public formCaptureElement: Array<FormPostElement>;



  constructor(private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer, private router: Router) {
 

    
  }

  search = (text$: Observable<string>) =>
  text$
    .debounceTime(2000)
    .distinctUntilChanged()
    .do((text) => console.log(text))
    .switchMap(term =>
      this.FormsService.getEmployeesList(term)
    )
  ;

  formatter = (x: {rut: string}) => x.rut;
  
  ngOnInit() {
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
        //console.log(stringToHtml);
        this.setTime(data['results']);
        
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
        if(this == document.getElementById("nueva-switch-caso-social")){
            $(this).toggleClass("checked");
            $(".switch.checked").click();
        }
        if(this == document.getElementById("nueva-label-grupo-switch-discapacidad")){
          $(this).toggleClass("checked");
          $(".switch.checked").click();
          $('#nueva-btn-completar-discapacidad').prop("disabled",false);
          
          $('#nueva-btn-completar-discapacidad').attr('href', '/acreditacion-discapacidad');
          $(this).toggleClass("discapacidad-activo");
        }

        if(this == document.getElementById("nueva-label-grupo-switch-derivacion")){
          $(this).toggleClass("checked");
          $(".switch.checked").click();
        }
        if(this == document.getElementById("nueva-label-grupo-switch-receta")){
          $(this).toggleClass("checked");
          $(".switch.checked").click();
        }
        if(this == document.getElementById("nueva-label-grupo-switch-licencia")){
          $(this).toggleClass("checked");
          $(".switch.checked").click();
        }
        if(this == document.getElementById("nueva-label-grupo-switch-orden")){
          $(this).toggleClass("checked");
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
        console.log(formCaptureElement);
      });

    },0);
  }

  //capturar elemendos del form
  capturarform(){
    console.log($(".fichaAtencion form").serialize());
  }


  formPost() {
    this.loading = true;
    
    let formulario = {
      patient: 1,
      attention_date: $("#fecha-atencion").val(),
      attentionRequest: [],
      elements: $(".fichaAtencion form").serializeArray(),
    }

    this.FormsService.formPost(formulario).subscribe(
      (res:Response) => {
        this.router.navigate(['/acreditacion-discapacidad']);
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );
  }

}
