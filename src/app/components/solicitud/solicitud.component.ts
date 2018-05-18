import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FormService } from '../../services/servicios.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {

  public isCollapsed = true;
  workingInformation: JSON;
  professionalInformation: JSON;
  attentionRequest: JSON;
  values: JSON;
  subscription;

  constructor(private route: ActivatedRoute, private FormsService: FormService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.attentionRequest = JSON.parse(params.attention_request);
      this.workingInformation = JSON.parse(params.workingInformation);
    });

    this.subscription = this.FormsService.getElementsValues(this.attentionRequest['medical_attention']['patient']['id']).subscribe( 
      data => {
        console.log(data)
        this.values = data;
      },
      error => {
        console.log(<any>error);
      }
    );

    this.subscription = this.FormsService.trabajadoresInfo(this.attentionRequest['medical_attention']['professional']['id']).subscribe( 
      data => {
        for(let datos of data['results']){
          this.professionalInformation = datos;
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
