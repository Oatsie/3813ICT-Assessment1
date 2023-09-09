import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupCreateModalComponent } from './group-create-modal.component';

describe('GroupCreateModalComponent', () => {
  let component: GroupCreateModalComponent;
  let fixture: ComponentFixture<GroupCreateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupCreateModalComponent]
    });
    fixture = TestBed.createComponent(GroupCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
