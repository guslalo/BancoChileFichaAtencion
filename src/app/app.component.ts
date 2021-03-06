import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";
import * as $ from 'jquery';

export class OtherModule {
}
const now = new Date();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  isLoggedIn: boolean = true;
  model: NgbDateStruct;
  date: {year: number, month: number};

  selectToday() {
    this.model = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }

  constructor( public router: Router) {

  }


  ngOnInit() {
      
      $(".contenedorAccion").click(function(){
        if($(".boxMensajeria").hasClass('expanded')){
          $(".contenedorAccion .cerrar").css("width","100%"); 
          $(".contenedorAccion .cerrar i").removeClass("rotate");  
          $(".boxMensajeria .list-group").stop().fadeToggle(1);
          $(".opcionOcultar").stop().fadeToggle(1);
          $(".oculto").stop().fadeToggle(1);
            $(".boxMensajeria") 
              .removeClass('expanded')
              .stop()
              .animate({width: '4%'}, 200);        
        }
        else{
            $(".contenedorAccion .cerrar").css("width","58px"); 
            $(".contenedorAccion .cerrar i").addClass("rotate");
            $(".boxMensajeria .list-group").stop().fadeToggle("slow");
            $(".opcionOcultar").stop().fadeToggle("slow");
            $(".oculto").stop().fadeToggle("slow");
             
            $(".boxMensajeria")
              .addClass('expanded')
              .stop()
              .animate({width: '30%'}, 200);                 
        }
      });
      



      
  }

}


