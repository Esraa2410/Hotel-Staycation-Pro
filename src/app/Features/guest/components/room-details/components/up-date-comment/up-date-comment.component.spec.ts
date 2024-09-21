import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDateCommentComponent } from './up-date-comment.component';

describe('UpDateCommentComponent', () => {
  let component: UpDateCommentComponent;
  let fixture: ComponentFixture<UpDateCommentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpDateCommentComponent]
    });
    fixture = TestBed.createComponent(UpDateCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
