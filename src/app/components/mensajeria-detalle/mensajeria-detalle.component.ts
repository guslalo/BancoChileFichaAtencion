import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

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
  public isCollapsed = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      let inboxManager: JSON = JSON.parse(params.inboxManager)

      this.content_object = inboxManager['content_object']
      this.attention_request = this.content_object['attention_request']
      this.medical_attention = this.attention_request['medical_attention']
      this.message = inboxManager['message']
    });

  

  }

  setClass(priority:JSON) {
    return priority['css_class'];
  }

  sendMessage(text:String,message:JSON) {
    console.log(text);
    console.log(message);
  }

}
