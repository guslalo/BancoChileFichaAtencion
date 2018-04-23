import { TestBed, inject } from '@angular/core/testing';

import { HtmlTreeService } from './html-tree.service';

describe('HtmlTreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HtmlTreeService]
    });
  });

  it('should be created', inject([HtmlTreeService], (service: HtmlTreeService) => {
    expect(service).toBeTruthy();
  }));
});
