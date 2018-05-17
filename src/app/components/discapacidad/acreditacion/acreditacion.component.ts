import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormService } from '../../../services/servicios.service';
import HtmlTreeService from '../../../services/html-tree.service';
import { Dynamic_Form } from '../../../models/dynamic_form';
import { Dynamic_Element } from '../../../models/dynamic_form';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {Location} from '@angular/common';

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
  public files:Array<any>
  workingInformation: JSON;
  
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer, private router: Router, private _location: Location) {

  }

  backClicked() {
    this._location.back();
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
        if (localStorage.getItem("medicalAttention")) {
          let medicalAttention: JSON;
          medicalAttention = JSON.parse(localStorage.getItem("medicalAttention"));
          this.loadValuesForm(medicalAttention['patient']['id']);
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

  loadValuesForm(id){
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

  setTime(data){
    setTimeout(function(){
      //input-file
      $(".custom-file-input").change(function(){
         $(this).siblings("label").html($(this).val().replace(/^.*\\/, ""));
      })

      $("input[type='file']").change(function(event){
        
        let reader = new FileReader();
        let file_n = {}
        if(event.target['files'] && event.target['files'].length > 0) {
          let file = event.target['files'][0];
          reader.readAsDataURL(file);
          reader.onload = (res) => {
            var a = [];
            if(localStorage.getItem('files')){
              a = JSON.parse(localStorage.getItem('files'));
            }
            file_n = {
              id_element: this.id,
              filename: file.name,
              filetype: file.type,
              value: reader.result.split(',')[1]
            }
            a.push(file_n);
            localStorage.setItem('files', JSON.stringify(a));
          };
        }
      })

    },0);
  }

  formPost(url) {
    this.loading = true;
    let employee: JSON;
    employee = JSON.parse(localStorage.getItem("employee"));

    let formulario = {
      patient: employee['id'],
      attention_date: false,
      attentionRequest: [],
      elements: $("#acreditacionForm").serializeArray(),
      files: this.files = JSON.parse(localStorage.getItem('files'))
    }

    this.FormsService.formPost(formulario).subscribe(
      (res) => {
        localStorage.removeItem("files");
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
