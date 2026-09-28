import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetialPage } from './product-detial.page';

describe('ProductDetialPage', () => {
  let component: ProductDetialPage;
  let fixture: ComponentFixture<ProductDetialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
