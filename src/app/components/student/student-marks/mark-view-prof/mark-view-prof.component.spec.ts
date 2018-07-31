import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkViewProfComponent } from './mark-view-prof.component';

describe('MarkViewProfComponent', () => {
  let component: MarkViewProfComponent;
  let fixture: ComponentFixture<MarkViewProfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkViewProfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkViewProfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
