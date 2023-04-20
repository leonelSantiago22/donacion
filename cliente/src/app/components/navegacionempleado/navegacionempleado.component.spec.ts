import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionempleadoComponent } from './navegacionempleado.component';

describe('NavegacionempleadoComponent', () => {
  let component: NavegacionempleadoComponent;
  let fixture: ComponentFixture<NavegacionempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavegacionempleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavegacionempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
