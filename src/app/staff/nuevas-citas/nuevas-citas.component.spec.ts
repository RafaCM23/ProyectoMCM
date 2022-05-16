import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevasCitasComponent } from './nuevas-citas.component';

describe('NuevasCitasComponent', () => {
  let component: NuevasCitasComponent;
  let fixture: ComponentFixture<NuevasCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevasCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevasCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
