import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScatterComponent } from './scatter.component';

describe('ScatterComponent', () => {
  let component: ScatterComponent;
  let fixture: ComponentFixture<ScatterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a dot and label for every city', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dataLength = (component as unknown as { data: unknown[] }).data.length;

    expect(compiled.querySelectorAll('circle').length).toBe(dataLength);
    const labels = Array.from(compiled.querySelectorAll('text')).map(label => label.textContent?.trim());
    (component as unknown as { data: { City: string }[] }).data.forEach(entry => {
      expect(labels).toContain(entry.City);
    });
  });

  it('should handle empty data without throwing', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    (component as unknown as { data: unknown[] }).data = [];
    (component as unknown as { createSvg: () => void }).createSvg();
    (component as unknown as { drawPlot: () => void }).drawPlot();

    expect(compiled.querySelectorAll('circle').length).toBe(0);
    expect(compiled.querySelector('svg')).toBeTruthy();
  });
});
