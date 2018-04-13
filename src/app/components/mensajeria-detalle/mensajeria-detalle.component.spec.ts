import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeriaDetalleComponent } from './mensajeria-detalle.component';

describe('MensajeriaDetalleComponent', () => {
  let component: MensajeriaDetalleComponent;
  let fixture: ComponentFixture<MensajeriaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeriaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeriaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
