import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckPage } from './check.page';

describe('CheckPage', () => {
  let component: CheckPage;
  let fixture: ComponentFixture<CheckPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
