import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaAtencionComponent } from './nueva-atencion.component';

describe('NuevaAtencionComponent', () => {
  let component: NuevaAtencionComponent;
  let fixture: ComponentFixture<NuevaAtencionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaAtencionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaAtencionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
