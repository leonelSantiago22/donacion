import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAdministradoComponent } from './solicitudes-administrado.component';

describe('SolicitudesAdministradoComponent', () => {
  let component: SolicitudesAdministradoComponent;
  let fixture: ComponentFixture<SolicitudesAdministradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudesAdministradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitudesAdministradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
