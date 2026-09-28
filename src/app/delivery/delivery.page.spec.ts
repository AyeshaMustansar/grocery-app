import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeliveryPage } from './delivery.page';

describe('DeliveryPage', () => {
  let component: DeliveryPage;
  let fixture: ComponentFixture<DeliveryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
