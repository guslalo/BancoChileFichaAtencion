import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpHeaders } from "@angular/common/http";
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { appRouters, routing } from "./app.routing";
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MensajeriaComponent } from './components/mensajeria/mensajeria.component';
import { MensajeriaDetalleComponent } from './components/mensajeria-detalle/mensajeria-detalle.component';


import { NuevaAtencionComponent } from './components/nueva-atencion/nueva-atencion.component';
import { BootstrapSwitchModule } from 'angular2-bootstrap-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcreditacionComponent } from './components/discapacidad/acreditacion/acreditacion.component';
import { InformeComponent } from './components/discapacidad/informe/informe.component';
import { FichaComponent } from './components/ficha/ficha.component';
import { RespuestaComponent } from './components/discapacidad/respuesta/respuesta.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { VerInformeComponent } from './components/discapacidad/ver-informe/ver-informe.component';
import { FormService } from './services/servicios.service';
import { FichaSidebarComponent } from './components/ficha-sidebar/ficha-sidebar.component';
import { LoadersCssModule } from 'angular2-loaders-css';

import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { AuthenticationService } from './services/authentication.service';
import { AlertService } from './services/alert.service';
import { AuthGuard } from './services/auth.guard';
import { SolicitudComponent } from './components/solicitud/solicitud.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MensajeriaComponent,
    MensajeriaDetalleComponent,
    NuevaAtencionComponent,
    AcreditacionComponent,
    InformeComponent,
    FichaComponent,
    RespuestaComponent,
    AgendaComponent,
    VerInformeComponent,
    FichaSidebarComponent,
    LoginComponent,
    AlertComponent,
    SolicitudComponent,
  ],
  
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    routing,
    FormsModule,
    HttpClientModule,
    BootstrapSwitchModule.forRoot(),
    BrowserAnimationsModule,
    LoadersCssModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
    AuthGuard,
    appRouters,
    FormService,
    AuthenticationService,
    AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

