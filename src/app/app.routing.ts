import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './components/home/home.component';
import { NuevaAtencionComponent } from './components/nueva-atencion/nueva-atencion.component';
import { AppComponent } from './app.component'
import { AcreditacionComponent } from './components/discapacidad/acreditacion/acreditacion.component';
import { InformeComponent } from './components/discapacidad/informe/informe.component';
import { MensajeriaDetalleComponent } from './components/mensajeria-detalle/mensajeria-detalle.component';
import { RespuestaComponent } from './components/discapacidad/respuesta/respuesta.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { VerInformeComponent } from './components/discapacidad/ver-informe/ver-informe.component';
import { FichaComponent } from './components/ficha/ficha.component';

import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './services/auth.guard';

const router: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    // { path: '', data: { title: 'Heroes List' },component: HomeComponent },
    // { path: '', redirectTo:'/example', pathMatch:'full'},
    { path: 'nueva-atencion', data: { title: 'Heroes List' },component: NuevaAtencionComponent},
    { path: 'acreditacion-discapacidad', data: { title: 'acreditacion Discapcidad' },component: AcreditacionComponent },
    { path: 'informe-discapacidad', data: { title: 'informe  Discapcidad' },component: InformeComponent },
    { path: 'respuesta-gestor-discapacidad', data: { title: 'respuesta gestor' },component: RespuestaComponent },
    { path: 'agenda', data: { title: 'mi agenda' },component: AgendaComponent },
    { path: 'detalle-mensaje', data: { title: 'mensaje' },component: MensajeriaDetalleComponent },
    { path: 'ver-informe', data: { title: 'Ver informe' },component: VerInformeComponent },
    { path: 'ficha-trabajador', data: { title: 'Ficha trabajador' },component: FichaComponent },
    { path: 'login', component: LoginComponent },
   
    /*
    { path: 'notas', component: NotasComponent },
    { path: 'capsulas', component: CapsulasComponent },
    { path: 'mibe-descuentos', component: MibeComponent },*/
   /* { path: 'hero/:id',      component: HeroDetailComponent },
    {
      path: 'heroes',
      component: HeroListComponent,
      data: { title: 'Heroes List' }
    },*/
    /*
    { path: '',
      redirectTo: '/heroes',
      pathMatch: 'full'
    },*/
    //{ path: '**', component: HomeComponent }

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    
  ];

  export const appRouters: any[] = [];
  export const routing: ModuleWithProviders = RouterModule.forRoot(router);
