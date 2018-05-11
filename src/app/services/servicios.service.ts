import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map'

const url = 'https://rinnolab.cl'
//const url = 'http://localhost:8000'

@Injectable()
export class FormService {
  constructor(private http: HttpClient) { }

  getFormulario(tipo: string): Observable<any>{
    return this.http.get(url+'/assistance/api/forms/?dynamic_form='+tipo);
  }

  formPost(form): Observable<any>{
    return this.http.post<any>(url+'/assistance/api/attentions/',form);
  }

  getEmployeesList(query: string): Observable<any>{
    return this.http.get(url+'/assistance/api/employeesList/?search_string=' + query)
    .map((response: Response) => <any>response['results'])
  }

  getManagerList(): Observable<any>{
    return this.http.get(url+'/assistance/api/managerList/')
    .map((response: Response) => <any>response['results'])
  }

  trabajadoresInfo(id:number): Observable<any>{
    return this.http.get(url+'/assistance/api/employee/?employee='+id)
  }

  getElementsValues(pk: number): Observable<any>{
    return this.http.get(url+'/assistance/api/elementsValues/?patient=' + pk)
    .map((response: Response) => <any>response)
  }







}
