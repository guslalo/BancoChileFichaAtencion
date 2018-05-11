import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormService } from '../../../services/servicios.service';
import HtmlTreeService from '../../../services/html-tree.service';
import { Dynamic_Form } from '../../../models/dynamic_form';
import { Dynamic_Element } from '../../../models/dynamic_form';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalService: NgbModal, private router: Router, private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer) {
  }

  handleFileInput(event) {
        
    let reader = new FileReader();
    let file_n = {}
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (res) => {
        file_n = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        }
        localStorage.setItem('reporte', JSON.stringify(file_n));
      };
    }
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
        this.setTime();
      },
      error => {
          console.log(<any>error);
      }
    );
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  formPost(content) {
    
    this.modalService.open(content)
    
  }

  setTime(){
    setTimeout(function(){  
      $(".switch").change(function(){
        //caso discapacidad
        if($("#informe-jefatura-conoce-discapacidad input").is(":checked")){
          $('#informe-textarea-observacion-jefatura').prop("disabled",false);
          $('#informe-grupo-observacion-jefatura').slideDown("fast");    
        }else{
          $('#informe-grupo-observacion-jefatura').slideUp("fast");
          $('#informe-textarea-observacion-jefatura').attr("disabled","disabled");
        }
      }); 
   
    },0);
  }

  modalPost(url) {

    this.loading = true;
    let employee: JSON;
    employee = JSON.parse(localStorage.getItem("employee"));
    let attentionRequest = {
      gerentes: this.selectedItems,
      prioridad: $("#prioridad").val(),
      fecha_vencimiento: $("#fecha_vencimiento").val(),
      asunto: $("#asunto").val(),
      invitacion_ver: $("#invitacion_ver").val(),
      informacion_requerida: $("#informacion_requerida").val(),
      mensaje: $("#mensaje").val(),
      reporte: JSON.parse(localStorage.getItem('reporte'))
    }
    let formulario = {
      patient: employee['id'],
      attention_date: false,
      attentionRequest: [attentionRequest],
      elements: $("#informeForm").serializeArray(),
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
        $( ".modal.fade.show,.modal-backdrop.fade.show" ).remove();
        this.router.navigate([url]);
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );

    
  }

}
