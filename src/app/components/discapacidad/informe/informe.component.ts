import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormService } from '../../../services/servicios.service';
import { switchForm } from '../../../models/switch';
import { Form, Group, Fila, Result } from '../../../models/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-informe',
  templateUrl: './informe.component.html',
  styleUrls: ['./informe.component.scss'],
  providers:[FormService]
})
export class InformeComponent implements OnInit {
    
  //colapsable antecedentes
  public isCollapsed = true;

  public loading = false;

  //modelo form solicitud
  public formSolicitud: Array<Form>;

  //arreglo de filas
  public formFilas: Array<Group>;
  public loadingComplete = false;
  public isLoading = true ;
   //filas
   public Fila1: Array<Fila>;
   public Fila2: Array<Fila>;
   public Fila3: Array<Fila>;
   public Fila4: Array<Fila>;
   public Fila6: Array<Fila>;
   public Fila8: Array<Fila>;

  //modal
  closeResult: string;
  constructor(private modalService: NgbModal, private http : HttpClient, private FormsService: FormService) {


    
  //result inicializado
  this.formSolicitud = Array<Form>();

  //arreglo de filas
  this.formFilas = new Array<Group>();

  //filas
  this.Fila1 = new Array<Fila>();
  this.Fila2 = new Array<Fila>();
  this.Fila3 = new Array<Fila>();
  this.Fila4 = new Array<Fila>();
  this.Fila6 = new Array<Fila>();
  this.Fila8 = new Array<Fila>();

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

   
    //console.log("cargando");
   
  }

}
