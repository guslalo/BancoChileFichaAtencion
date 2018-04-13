import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acreditacion',
  templateUrl: './acreditacion.component.html',
  styleUrls: ['./acreditacion.component.scss']
})
export class AcreditacionComponent implements OnInit {
  goBack() {
    window.history.back();
  }
  constructor() { }

  ngOnInit() {
  }

}
