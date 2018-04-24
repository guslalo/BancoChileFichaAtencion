import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { FormService } from '../../services/servicios.service';
import HtmlTreeService from '../../services/html-tree.service';
import { Dynamic_Form } from '../../models/dynamic_form';
import { Dynamic_Element } from '../../models/dynamic_form';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-nueva-atencion',
  templateUrl: './nueva-atencion.component.html',
  styleUrls: ['./nueva-atencion.component.scss'],
  providers:[FormService]
})

export class NuevaAtencionComponent implements OnInit {
  MyForm: SafeHtml;
  subscription;

  
  public loading = false;
  public loadingComplete = false;
  public isLoading = true ;

  constructor(private http : HttpClient, private FormsService: FormService, private sanitizer: DomSanitizer) {


  }


  ngOnInit() {
    this.subscription = this.FormsService.getFormulario('nueva-atencion').subscribe(
      
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
      },
      error => {
          console.log(<any>error);
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
