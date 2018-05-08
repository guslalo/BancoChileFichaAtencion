import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormService } from '../../../services/servicios.service';
import HtmlTreeService from '../../../services/html-tree.service';
import { Dynamic_Form } from '../../../models/dynamic_form';
import { Dynamic_Element } from '../../../models/dynamic_form';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acreditacion',
  templateUrl: './acreditacion.component.html',
  styleUrls: ['./acreditacion.component.scss'],
  providers:[FormService]
})

export class AcreditacionComponent implements OnInit {
  MyForm: SafeHtml;
  subscription;

  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;

  workingInformation: JSON;
  constructor(private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer, private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem("workingInformation")) {
      this.workingInformation = JSON.parse(localStorage.getItem("workingInformation"));
    }
    this.subscription = this.FormsService.getFormulario('acreditacion-discapacidad').subscribe(
      
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
        this.setTime(data);
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  setTime(data){
    setTimeout(function(){
      //input-file
      $(".custom-file-input").change(function(){
         $(this).siblings("label").html($(this).val().replace(/^.*\\/, ""));
      })

    },0);
  }

  formPost() {
    this.loading = true;
    
    let formulario = {
      patient: 1,
      attention_date: $("#ficha-atencion").val(),
      attentionRequest: [],
      elements: $("form#acreditacionForm").serializeArray(),
    }

    this.FormsService.formPost(formulario).subscribe(
      (res:Response) => {
        this.router.navigate(['/informe-discapacidad']);
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );
  }
}
