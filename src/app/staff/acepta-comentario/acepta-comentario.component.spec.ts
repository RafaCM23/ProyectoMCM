import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AceptaComentarioComponent } from './acepta-comentario.component';

describe('AceptaComentarioComponent', () => {
  let component: AceptaComentarioComponent;
  let fixture: ComponentFixture<AceptaComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AceptaComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AceptaComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
