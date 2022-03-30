import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HacerComentarioComponent } from './hacer-comentario.component';

describe('HacerComentarioComponent', () => {
  let component: HacerComentarioComponent;
  let fixture: ComponentFixture<HacerComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HacerComentarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HacerComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
