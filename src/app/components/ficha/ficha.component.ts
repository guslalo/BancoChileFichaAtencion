import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import { FormService } from '../../services/servicios.service';



@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styleUrls: ['./ficha.component.scss']
})
export class FichaComponent implements OnInit {

  public isCollapsed = true;
  workingInformation: JSON;
  professionalInformation: JSON;
  attentionRequest: JSON;
  values: JSON;
  subscription;



  constructor(private route: ActivatedRoute, private FormsService: FormService) {

   }

  ngOnInit() {


 
  }

}


