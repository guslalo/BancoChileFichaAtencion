import { Component, OnInit } from '@angular/core';
import {Router, NavigationExtras, ActivatedRoute} from "@angular/router";
import { FormService } from '../../services/servicios.service';

@Component({
  selector: 'app-mensajeria-detalle',
  templateUrl: './mensajeria-detalle.component.html',
  styleUrls: ['./mensajeria-detalle.component.scss']
})
export class MensajeriaDetalleComponent implements OnInit {
  subscription;
  message: JSON
  content_object: JSON
  attention_request: JSON
  medical_attention: JSON
  workingInformation: JSON;
  safeHtmlContent : string;
  public isCollapsed = false;

  constructor(private route: ActivatedRoute, private FormsService: FormService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("currentUser")){
      this.route.queryParams.subscribe(params => {
        let inboxManager: JSON = JSON.parse(params.inboxManager)
        this.FormsService.getOneMessages(inboxManager['id']).subscribe(
          (res) => {
            let inboxManager = res
            this.content_object = inboxManager['content_object']
            this.attention_request = this.content_object['attention_request']
            this.medical_attention = this.attention_request['medical_attention']
            this.message = inboxManager['message']
          },
          error => {
            console.log(error);
          }
        );
  
        this.FormsService.trabajadoresInfo(inboxManager['content_object']['attention_request']['medical_attention']['patient']['id']).subscribe( 
          data => {
            for(let datos of data['results']){
              this.workingInformation = datos;
            }           
          },
          error => {
              console.log(<any>error);
          }
        );
      });
    }
    
  }

  setClass(priority:JSON) {
    return priority['css_class'];
  }

  goToAttentionRequestDetail(){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        attention_request: JSON.stringify(this.attention_request),
        workingInformation: JSON.stringify(this.workingInformation)
      }
    };
    this.router.navigate(['/solicitud'], navigationExtras);
  }

  sendMessage(body,subject,message:JSON) {

    var child = {
      body: body.value,
      parent_msg: this.message['id'],
      subject: subject.value,
    }

    this.FormsService.postMessage(child).subscribe(
      (res) => {
        this.message['childs_msg'].push(res);
        body.value = "";
        subject.value = "";
      },
      error => {
        console.log(error);
      }
    );

  }

}
