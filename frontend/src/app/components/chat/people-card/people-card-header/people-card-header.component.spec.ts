import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PeopleCardHeaderComponent} from './people-card-header.component';

describe('PeopleCardHeaderComponent', () => {
  let component: PeopleCardHeaderComponent;
  let fixture: ComponentFixture<PeopleCardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleCardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleCardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
