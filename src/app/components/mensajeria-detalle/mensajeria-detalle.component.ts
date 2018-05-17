import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { FormService } from '../../services/servicios.service';

@Component({
  selector: 'app-mensajeria-detalle',
  templateUrl: './mensajeria-detalle.component.html',
  styleUrls: ['./mensajeria-detalle.component.scss']
})
export class MensajeriaDetalleComponent implements OnInit {
  message: JSON
  content_object: JSON
  attention_request: JSON
  medical_attention: JSON
  safeHtmlContent : string;
  public isCollapsed = false;

  constructor(private route: ActivatedRoute, private FormsService: FormService) { }

  ngOnInit() {
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

    });
  }

  setClass(priority:JSON) {
    return priority['css_class'];
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
