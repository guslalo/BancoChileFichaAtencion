import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from '../../services/authentication.service';
import { AlertService } from '../../services/alert.service';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None
})
 
 //encapsulation: ViewEncapsulation.Emulated,
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    //this._ref.destroy(); 

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //$("app-header").hide(); 
        $("div").each(function(){
            if($("div").hasClass("login")){
              /*  $(".boxCuerpo").addClass("full"); 
                $("app-header").hide();  
                $(".boxMensajeria").remove();*/
            }
        })
    }
 
    login() {
        this.loading = true;
        
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                  console.log(error)
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
    OnDestroy(){
        //this.HeaderComponent:OnDestroy;
    }
}