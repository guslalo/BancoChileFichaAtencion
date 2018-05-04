import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormService } from '../../../services/servicios.service';
import HtmlTreeService from '../../../services/html-tree.service';
import { Dynamic_Form } from '../../../models/dynamic_form';
import { Dynamic_Element } from '../../../models/dynamic_form';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-acreditacion',
  templateUrl: './acreditacion.component.html',
  styleUrls: ['./acreditacion.component.scss'],
  providers:[FormService]
})

export class AcreditacionComponent implements OnInit {
  MyForm: SafeHtml;
  subscription;

  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;

  constructor(private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.subscription = this.FormsService.getFormulario('acreditacion-discapacidad').subscribe(
      
      data => {
        this.isLoading = false;
        this.loadingComplete = true;
        
        let stringToHtml = '';
        for(let form of data['results']){
          stringToHtml = HtmlTreeService.buildForm(form);
        }
        
        this.MyForm = this.sanitizer.bypassSecurityTrustHtml(
          stringToHtml
        )
        //console.log(stringToHtml);
        this.setTime(data);
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }


  setTime(data){
    setTimeout(function(){
      //input-file
      $(".custom-file-input").change(function(){
         $(this).siblings("label").html($(this).val().replace(/^.*\\/, ""));
      })

    },0);
  }

  
}
