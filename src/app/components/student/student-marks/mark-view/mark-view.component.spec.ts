import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkViewComponent } from './mark-view.component';

describe('MarkViewComponent', () => {
  let component: MarkViewComponent;
  let fixture: ComponentFixture<MarkViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
