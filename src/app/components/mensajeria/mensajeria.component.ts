import { Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MensajeriaComponent implements OnInit {
  public isCollapsed:boolean;
  constructor() { 

   this.isCollapsed = false;
  }

  ngOnInit() {
  }

}
