import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { BarComponent } from './bar/bar.component';
import { PieComponent } from './pie/pie.component';
import { ScatterComponent } from './scatter/scatter.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        BarComponent,
        PieComponent,
        ScatterComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it(`should have as title 'd3-angular'`, () => {
    expect(fixture.componentInstance.title).toEqual('d3-angular');
  });

  it('should render title', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('Angular + D3');
  });

  it('should render all chart containers', () => {
    expect(compiled.querySelectorAll('figure').length).toBe(3);
  });
});
