import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormService } from '../../services/servicios.service';
import { switchForm } from '../../models/switch';
import { Form, Group, Fila, Result } from '../../models/forms';

@Component({
  selector: 'app-nueva-atencion',
  templateUrl: './nueva-atencion.component.html',
  styleUrls: ['./nueva-atencion.component.scss'],
  providers:[FormService]
})

export class NuevaAtencionComponent implements OnInit {

  public loading = false;

  //modelo form solicitud
  public formSolicitud: Array<Form>;

  //arreglo de filas
  public formFilas: Array<Group>;

  //filas
  public Fila1: Array<Fila>;
  public Fila2: Array<Fila>;
  public Fila3: Array<Fila>;
  public Fila4: Array<Fila>;
  public Fila6: Array<Fila>;
  public Fila8: Array<Fila>;

  public switch: Array<switchForm>;

  /*test = {
    name: 'Test  2',
    section: 'Section 2'
  };*/
  public loadingComplete = false;
  public isLoading = true ;

constructor(private http : HttpClient, private FormsService: FormService) {

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

   this.switch = new Array<switchForm>();
 
 

}



private activado:Boolean;

heroes: any;
switchUi: any = {
  onText: 'Si',
  offText: 'No',
  onColor:'green',
  offColor:'red',
  status:false
};


onFlagChange(event){ 
 
}/**/

idSwitch(id){
  if(id == 's1'){
     //let sdi = document.getElementById('switch-discapacidad-inline');
     console.log(id);
  }
  if(id == 's2'){
    //let sdi = document.getElementById('switch-discapacidad-inline');
    console.log(id);
    //$('#completar-discapacidad-inline').prop('disabled', false); 
 }
}

  ngOnInit() {
   
    //console.log("cargando");
    this.FormsService.getSolicitud().subscribe(
      
      data => {
       
        //console.log("cargado listo");
        this.isLoading = false;
        this.loadingComplete = true;
      
        this.formSolicitud.push(data['results'][0]);

        //arreglo de filas
        for(let item of this.formSolicitud){
          for(let item2 of item.groups){
            this.formFilas.push(item2);
          }  
        }
    
        //recorro filas generales
        for(let item of this.formFilas){
          //asigno valor a fila1
          if(item['dynamic_element'].id_element == 'fila1'){
            this.Fila1.push(item['dynamic_element']);
          }
          //asigno valor a fila2
          if(item['dynamic_element'].id_element == 'fila2'){
            this.Fila2.push(item['dynamic_element']);
          }
          //asigno valor a fila3
          if(item['dynamic_element'].id_element == 'fila3'){
            this.Fila3.push(item['dynamic_element']);
          }
          //asigno valor a fila4
          if(item['dynamic_element'].id_element == 'fila4'){
            this.Fila4.push(item['dynamic_element']);
          }
          //asigno valor a fila6
          if(item['dynamic_element'].id_element == 'fila6'){
            this.Fila6.push(item['dynamic_element']);
          }
          //asigno valor a fila8
          if(item['dynamic_element'].id_element == 'fila8'){
            this.Fila8.push(item['dynamic_element']);
          }
        }
        //let IdElemento  = this.dynamic_element.filter(r => r.id_element);
       /* $("#caso-social-inline *").click( function(){
          alert("nasd");
        });*/
      },
      error => {
          console.log(<any>error);
      }
    );
  }

}
