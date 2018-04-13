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


  constructor(private http : HttpClient, private formService: FormService) {


  }

  ngOnInit() {
  
  }

}
