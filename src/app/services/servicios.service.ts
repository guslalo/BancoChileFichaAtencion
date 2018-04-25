import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class FormService {
  constructor(private http: HttpClient) { }

  getFormulario(tipo: string): Observable<any>{
    return this.http.get('http://localhost:8000/assistance/api/forms/?dynamic_form='+tipo);
  }
  



}
