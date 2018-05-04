import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map'

@Injectable()
export class FormService {
  constructor(private http: HttpClient) { }

  //get formularios
  getFormulario(tipo: string): Observable<any>{
    return this.http.get('https://rinnolab.cl/assistance/api/forms/?dynamic_form='+tipo);
  }
  //post formularios
  formPost(form): Observable<any>{
    return this.http.post<any>('https://rinnolab.cl/assistance/api/attentions/',form);
  }

  //get trabajador search
  getEmployeesList(query: string): Observable<any>{
    return this.http.get('https://rinnolab.cl/assistance/api/employeesList/?search_string=' + query)
    .map((response: Response) => <any>response['results'])
    //.do(data => console.log(data));
  }

  //get trabajadores informacion
  trabajadoresInfo(id:number): Observable<any>{
    return this.http.get('https://rinnolab.cl/assistance/api/employee/?employee='+id)
  }









}
