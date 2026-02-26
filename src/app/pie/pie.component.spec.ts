import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PieComponent } from './pie.component';

describe('PieComponent', () => {
  let component: PieComponent;
  let fixture: ComponentFixture<PieComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create one slice and label per city', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dataLength = (component as unknown as { data: unknown[] }).data.length;

    expect(compiled.querySelectorAll('path').length).toBe(dataLength);
    expect(compiled.querySelectorAll('text').length).toBe(dataLength);
  });

  it('should re-render pie chart when invoked again', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    (component as unknown as { createSvg: () => void }).createSvg();
    (component as unknown as { createColors: () => void }).createColors();
    (component as unknown as { drawChart: () => void }).drawChart();

    expect(compiled.querySelector('svg')).toBeTruthy();
    expect(compiled.querySelectorAll('path').length).toBeGreaterThan(0);
  });
});
