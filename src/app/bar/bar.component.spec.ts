import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BarComponent } from './bar.component';

describe('BarComponent', () => {
  let component: BarComponent;
  let fixture: ComponentFixture<BarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render axes and one bar per city', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const dataLength = (component as unknown as { data: unknown[] }).data.length;

    expect(compiled.querySelectorAll('g.bar-axis').length).toBe(2);
    expect(compiled.querySelectorAll('rect').length).toBe(dataLength);
  });

  it('should render an empty chart when no data exists', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    (component as unknown as { createSvg: () => void }).createSvg();
    (component as unknown as { drawBars: (data: unknown[]) => void }).drawBars([]);

    expect(compiled.querySelectorAll('rect').length).toBe(0);
    expect(compiled.querySelector('svg')).toBeTruthy();
  });
});
