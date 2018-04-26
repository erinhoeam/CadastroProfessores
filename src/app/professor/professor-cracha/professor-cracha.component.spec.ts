import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCrachaComponent } from './professor-cracha.component';

describe('ProfessorCrachaComponent', () => {
  let component: ProfessorCrachaComponent;
  let fixture: ComponentFixture<ProfessorCrachaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorCrachaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorCrachaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
