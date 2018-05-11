import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormService } from '../../../services/servicios.service';
import HtmlTreeService from '../../../services/html-tree.service';
import { Dynamic_Form } from '../../../models/dynamic_form';
import { Dynamic_Element } from '../../../models/dynamic_form';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss'],
  providers:[FormService]
})
export class InformeComponent implements OnInit {
  
  public isCollapsed = true;
  MyForm: SafeHtml;
  subscription;

  workingInformation: JSON;
  
  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  placeholder = 'Seleccionar Gestor(es)';

  closeResult: string;
  constructor(private modalService: NgbModal, private router: Router, private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer) {
  }

  enviarSolicitudGestor() {
    console.log("Perfecto!!!!")
  }

  ngOnInit() {
    this.FormsService.getManagerList().subscribe(data => this.dropdownList = data);
    this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'full_name',
        selectAllText: 'Seleccionar Todos',
        unSelectAllText: 'Deseleccionar Todos',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        searchPlaceholderText: 'Introduzca nombre o apellido para buscar'
    };
    if (localStorage.getItem("workingInformation")) {
      this.workingInformation = JSON.parse(localStorage.getItem("workingInformation"));
    }
    
    this.subscription = this.FormsService.getFormulario('informe-discapacidad').subscribe(
      
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
      },
      error => {
          console.log(<any>error);
      }
    );

    $(".prioridad").on("click",function(){
      alert("test");
    });
    this.setTime();

    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  formPost(url,content) {
    this.loading = true;
    let employee: JSON;
    employee = JSON.parse(localStorage.getItem("employee"));
    let formulario = {
      patient: employee['id'],
      attention_date: false,
      attentionRequest: [],
      elements: $("#informeForm").serializeArray(),
      files: []
    }

    this.FormsService.formPost(formulario).subscribe(
      (res) => {
        if(url == '/'){
          localStorage.removeItem('medicalAttention');
          localStorage.removeItem("workingInformation");
          localStorage.removeItem("employee");
        }else{
          localStorage.setItem('medicalAttention', JSON.stringify(res));
        }
        this.modalService.open(content)
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );

    
  }


  setTime(){
    setTimeout(function(){
      $(".dropdown-item").on("click",function(){
        var replaced = $(this).text();
        console.log(replaced);
        $("#prioriodad").text("replaced");
      });
    },0);
  }


}
