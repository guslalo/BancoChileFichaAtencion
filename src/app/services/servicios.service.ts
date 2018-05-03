import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class FormService {
  constructor(private http: HttpClient) { }

  getFormulario(tipo: string): Observable<any>{
    return this.http.get('https://rinnolab.cl/assistance/api/forms/?dynamic_form='+tipo);
    // return this.http.get('http://localhost:8000/assistance/api/forms/?dynamic_form='+tipo);
  }

 
  formPost(form:any): Observable<any>{
    return this.http.post<any>('https://rinnolab.cl/hxc/api//',form)
            .map(form => {
                // login successful if there's a jwt token in the response
                if (form) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log(form)
                    localStorage.setItem('currentForm', JSON.stringify(form));
                }
 
                return JSON.stringify(form);
            });
  } /**/



}
