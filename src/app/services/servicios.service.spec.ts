import { TestBed, inject } from '@angular/core/testing';



describe('ServiciosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiciosService]
    });
  });

  it('should be created', inject([ServiciosService], (service: ServiciosService) => {
    expect(service).toBeTruthy();
  }));
});
