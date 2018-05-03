import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { FormService } from '../../services/servicios.service';
import HtmlTreeService from '../../services/html-tree.service';
import { Dynamic_Form } from '../../models/dynamic_form';
import { Dynamic_Element, FormPostElement } from '../../models/dynamic_form';
//import { formPostElement } from '../../models/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Post } from '../../models/form_post';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { formPostElement } from '../../models/forms';

@Component({
  selector: 'app-nueva-atencion',
  templateUrl: './nueva-atencion.component.html',
  styleUrls: ['./nueva-atencion.component.scss'],
  providers:[FormService]
})

export class NuevaAtencionComponent implements OnInit {
  MyForm: SafeHtml;
  subscription;
  
  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;
  public formCapture: Array<FormPostElement>;
  public formCaptureElement: Array<FormPostElement>;



  constructor(private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer) {
 
    this.formCapture = new Array<FormPostElement>();
    this.formCaptureElement = new Array<FormPostElement>();
  }

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
        this.capturarform();
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
    },0);
  }

  //capturar elemendos del form
  capturarform(){
    $(".fichaAtencion").each(function(){
      if($(".fichaAtencion form").hasClass("ng-untouched")){
        let elementForm = $(".fichaAtencion .form-control");
          let formCapture = $(".fichaAtencion form");
          console.log(formCapture);
        }
    });
  }

  
  formPost() {
    let form: any = {};
    this.loading = true;
        
      this.FormsService.formPost(form)
      .subscribe(
        data => {
  
        },
        error => {
          console.log(error)
            this.loading = false;
        });
    }



}
