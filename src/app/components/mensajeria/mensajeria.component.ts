import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, NavigationExtras} from "@angular/router";

import { FormService } from '../../services/servicios.service';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MensajeriaComponent implements OnInit {
  subscription;
  inboxManager: JSON;
  public isCollapsed:boolean;
  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;

  constructor(private FormsService: FormService, private router: Router) {
    this.isCollapsed = false;
  }

  ngOnInit() {
    /*this.isLoading = false;
    this.loadingComplete = true;*/
    if(localStorage.getItem('currentUser')){
      this.subscription = this.FormsService.getMessages().subscribe( 
        data => {
         
          this.inboxManager = data
        },
        error => {
          console.log(<any>error);
        }
      );
    }
  }

  setClass(priority:JSON) {
    return priority['css_class'];
  }

  detalleMensaje(mensaje:JSON){
    let navigationExtras: NavigationExtras = {
      queryParams: {
        inboxManager: JSON.stringify(mensaje)
      }
    };

    this.router.navigate(['./detalle-mensaje'], navigationExtras);
  }

}
