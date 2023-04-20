import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavegacionencargadoComponent } from './navegacionencargado.component';

describe('NavegacionencargadoComponent', () => {
  let component: NavegacionencargadoComponent;
  let fixture: ComponentFixture<NavegacionencargadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavegacionencargadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavegacionencargadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
