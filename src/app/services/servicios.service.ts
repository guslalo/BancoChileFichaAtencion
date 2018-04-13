import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Form, Group, Dynamic_element } from '../models/forms';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class FormService {
  formSolicitud: Array<Form>;
  formFilas: Array<Group>;



  public formsApi = 'https://rinnolab.cl/assistance/api/forms/'
  public token = 'Token a94c50828c5a091e4a41a5a3854189bc98092d6c';

  constructor(public http: HttpClient) {  

  
  }

  //get form nueva solicitud
  getSolicitud(): Observable<any>{
    const headers = { 'Authorization': this.token };
    return this.http.get(this.formsApi, { headers:headers});  //, observe: 'events', reportProgress: true 
  }



}
