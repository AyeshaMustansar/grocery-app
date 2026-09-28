import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnbordingPage } from './onbording.page';

describe('OnbordingPage', () => {
  let component: OnbordingPage;
  let fixture: ComponentFixture<OnbordingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OnbordingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
