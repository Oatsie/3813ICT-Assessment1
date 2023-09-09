import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelCreateModalComponent } from './channel-create-modal.component';

describe('ChannelCreateModalComponent', () => {
  let component: ChannelCreateModalComponent;
  let fixture: ComponentFixture<ChannelCreateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChannelCreateModalComponent]
    });
    fixture = TestBed.createComponent(ChannelCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
