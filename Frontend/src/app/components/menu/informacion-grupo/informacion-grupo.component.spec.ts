import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionGrupoComponent } from './informacion-grupo.component';

describe('InformacionGrupoComponent', () => {
  let component: InformacionGrupoComponent;
  let fixture: ComponentFixture<InformacionGrupoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformacionGrupoComponent]
    });
    fixture = TestBed.createComponent(InformacionGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
