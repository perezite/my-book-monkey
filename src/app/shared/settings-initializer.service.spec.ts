import { TestBed } from '@angular/core/testing';

import { SettingsInitializerService } from './settings-initializer.service';

describe('SettingsInitializerService', () => {
  let service: SettingsInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
