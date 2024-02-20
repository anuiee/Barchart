import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarchartDynamicComponent } from './barchart-dynamic.component';

describe('BarchartDynamicComponent', () => {
  let component: BarchartDynamicComponent;
  let fixture: ComponentFixture<BarchartDynamicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarchartDynamicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarchartDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
