import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicGPage } from './ionic-g.page';

describe('IonicGPage', () => {
  let component: IonicGPage;
  let fixture: ComponentFixture<IonicGPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicGPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
