import { Component, OnInit, Input } from '@angular/core';
import { FormService } from '../../services/servicios.service';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-ficha-sidebar',
  templateUrl: './ficha-sidebar.component.html',
  styleUrls: ['./ficha-sidebar.component.scss']
})
export class FichaSidebarComponent {
  @Input() workingInformation: JSON;

  constructor() { }

}
