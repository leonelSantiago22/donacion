import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonadoresComponent } from './donadores.component';

describe('DonadoresComponent', () => {
  let component: DonadoresComponent;
  let fixture: ComponentFixture<DonadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
