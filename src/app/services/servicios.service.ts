import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Form, Group, Dynamic_element } from '../models/forms';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class FormService {

  public formsApi = 'https://rinnolab.cl/assistance/api/'
  public token = 'Token a94c50828c5a091e4a41a5a3854189bc98092d6c';
  public headers = { 'Authorization': this.token };

  constructor(public http: HttpClient) {  

  }

  getFormulario(tipo: string): Observable<any>{
    this.formsApi += 'forms/?dynamic_form='+tipo
    return this.http.get(this.formsApi, { headers:this.headers});
  }
  



}
