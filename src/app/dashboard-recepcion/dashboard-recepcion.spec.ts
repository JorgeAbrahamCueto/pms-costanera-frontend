import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardRecepcion } from './dashboard-recepcion';

describe('DashboardRecepcion', () => {
  let component: DashboardRecepcion;
  let fixture: ComponentFixture<DashboardRecepcion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecepcion],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardRecepcion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
