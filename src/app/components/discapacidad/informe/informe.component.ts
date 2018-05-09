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
    
  //colapsable antecedentes
  public isCollapsed = true;
  MyForm: SafeHtml;
  subscription;

  workingInformation: JSON;
  
  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;

  //modal
  closeResult: string;
  constructor(private modalService: NgbModal, private router: Router, private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer) {


   //this.switch = new Array<switchForm>();
 
   }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  
  ngOnInit() {
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
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  formPost(url) {
    this.loading = true;
    let employee: JSON;
    employee = JSON.parse(localStorage.getItem("employee"));
    let formulario = {
      patient: employee['id'],
      attention_date: $("#fecha-atencion").val(),
      attentionRequest: [],
      elements: $(".fichaAtencion form").serializeArray(),
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
        this.router.navigate([url]);
      },
      error => {
        console.log(error)
        this.loading = false;
      }
    );
  }
}
