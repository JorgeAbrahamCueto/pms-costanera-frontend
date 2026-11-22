import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecepNavbar } from './recep-navbar';

describe('RecepNavbar', () => {
  let component: RecepNavbar;
  let fixture: ComponentFixture<RecepNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(RecepNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
