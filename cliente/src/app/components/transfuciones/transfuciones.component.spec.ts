import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransfucionesComponent } from './transfuciones.component';

describe('TransfucionesComponent', () => {
  let component: TransfucionesComponent;
  let fixture: ComponentFixture<TransfucionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransfucionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransfucionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
