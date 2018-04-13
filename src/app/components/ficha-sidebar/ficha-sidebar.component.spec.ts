import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaSidebarComponent } from './ficha-sidebar.component';

describe('FichaSidebarComponent', () => {
  let component: FichaSidebarComponent;
  let fixture: ComponentFixture<FichaSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichaSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
