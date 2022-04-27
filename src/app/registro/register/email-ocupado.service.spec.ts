import { TestBed } from '@angular/core/testing';

import { EmailOcupadoService } from '../email-ocupado.service';

describe('EmailOcupadoService', () => {
  let service: EmailOcupadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailOcupadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
