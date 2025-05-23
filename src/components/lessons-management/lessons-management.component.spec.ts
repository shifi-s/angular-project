import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonsManagementComponent } from './lessons-management.component';

describe('LessonsManagementComponent', () => {
  let component: LessonsManagementComponent;
  let fixture: ComponentFixture<LessonsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
