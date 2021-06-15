import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeIconComponent } from './informative-icon.component';

describe('InformativeIconComponent', () => {
  let component: InformativeIconComponent;
  let fixture: ComponentFixture<InformativeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformativeIconComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformativeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
