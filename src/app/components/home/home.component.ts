import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { FormService } from '../../services/servicios.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[FormService]
})
export class HomeComponent implements OnInit {
  //atenciones
  atenciones = [
    {
      id:1,
      fecha: "6 Feb",
      trabajador: [
        {
          name:"Luis",
          rut:"26681060-4"
        }
      ],
      tipoCaso:"icon",
      areaConsulta:"Area 1",
      motivoConsulta:"Motivo 2",
      resumenCaso:"Texto Resumen 1",
      proxSeguimiento:[
        {
          fecha:"30 Feb",
          plazo:"3"
        }
      ]
    },
    {
      id:2,
      fecha: "15 Mar",
      trabajador: [
        {
          name:"Gustavo",
          rut:"16681060-4"
        }
      ],
      tipoCaso:"icon",
      areaConsulta:"Area 2",
      motivoConsulta:"Motivo 4",
      resumenCaso:"Texto Resumen 2",
      proxSeguimiento:[
        {
          fecha:"30 Mar",
          plazo:"13"
        }
      ]
    },
    {
      id:3,
      fecha: "18 Mar",
      trabajador: [
        {
          name:"Felipe",
          rut:"18681060-4"
        }
      ],
      tipoCaso:"icon",
      areaConsulta:"Area 2",
      motivoConsulta:"Motivo 4",
      resumenCaso:"Texto Resumen 2",
      proxSeguimiento:[
        {
          fecha:"18 Mar",
          plazo:"9"
        }
      ]
    },
 ];

 //solicitudes
  solicitudes = [
    {
      respuestas:10,
      asignadas:[
        {
          cantidad:5,
          fueraPlazo:1
        }
      ],
      creadas:[  
        {
          cantidad:8,
          fueraPlazo:4
        }
      ],  
    }    
  ];

  //seguimientos
  seguimientos = [
    {
      total:28,
      fueraPlazo:12,
      vence:9,
    }    
  ];

  //discapacidad
  discapacidad = [
    {
    casosAcreditados:14,
    acreditacionPendiente:34,
    informePendiente:44,
    respuestaGestorPendiente:[ 
      {
        cantidad:12,
        plazo:2,
      }
    ],
    respuestaLista:64,
    }
  ]

  //agendamientps
  agendamientos = [
    {
      id:0,
      hora:"12:54",
      trabajador:[
        {
          name:"Nicolas Perez",
          motivo: "Familiar- Accidente padre/madre"
        }
      ]
    },
    {
      id:1,
      hora:"2:54",
      trabajador:[
        {
          name:"Antonio Perez",
          motivo: "Familiar- Accidente padre/madre"
        }
      ]
    },
    {
      id:2,
      hora:"1:54",
      trabajador:[
        {
          name:"Freddy Perez",
          motivo: "Familiar- Accidente padre/madre"
        }
      ]
    }
    
  ]



  constructor(private http : HttpClient, private formService: FormService) {


  }

  ngOnInit() {
  
  }

}
