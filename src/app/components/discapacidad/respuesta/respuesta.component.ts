import { Component, OnInit } from '@angular/core';
import { FormService } from '../../../services/servicios.service';
import {Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-respuesta',
  templateUrl: './respuesta.component.html',
  styleUrls: ['./respuesta.component.scss']
})
export class RespuestaComponent implements OnInit {
  workingInformation: JSON;
  subscription;
  priority = {}
  attention_request = {}

  constructor(private FormsService: FormService, private router: Router) { }

  ngOnInit() {
    let medicalAttention: JSON;
    medicalAttention = JSON.parse(localStorage.getItem("medicalAttention"));
    this.FormsService.getRequestMedical(medicalAttention['id']).subscribe(
      data => {

        this.attention_request = data
        this.priority = data.priority
      }
    );

    if (localStorage.getItem("workingInformation")) {
      this.workingInformation = JSON.parse(localStorage.getItem("workingInformation"));
    }

  }
  
  setClass() {
    return this.priority['css_class'];
  }

  goToAttentionRequestDetail(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        attention_request: JSON.stringify(this.attention_request),
        workingInformation: localStorage.getItem("workingInformation")
      }
    };
    this.router.navigate(['/solicitud'], navigationExtras);
  }


}
