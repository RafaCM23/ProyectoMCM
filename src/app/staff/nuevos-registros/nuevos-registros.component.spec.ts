import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevosRegistrosComponent } from './nuevos-registros.component';

describe('NuevosRegistrosComponent', () => {
  let component: NuevosRegistrosComponent;
  let fixture: ComponentFixture<NuevosRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevosRegistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevosRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
