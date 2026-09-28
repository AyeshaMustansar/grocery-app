import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderAcceptedPage } from './order-accepted.page';

describe('OrderAcceptedPage', () => {
  let component: OrderAcceptedPage;
  let fixture: ComponentFixture<OrderAcceptedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderAcceptedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
