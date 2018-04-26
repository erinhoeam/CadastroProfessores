import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';
import { ProfessorRoutingModule } from './professor.routing.module';
import { ProfessorFormComponent } from './professor-form/professor-form.component';
import { ProfessorListarComponent } from './professor-listar/professor-listar.component';
import { ProfessorMainComponent } from './professor-main/professor-main.component';
import { ProfessorCrachaComponent } from './professor-cracha/professor-cracha.component';
import { ProfessorService } from '../services/professor.service';
import { HomeService } from './../services/home.service';

@NgModule({
  imports: [
    FormsModule,SharedModule,ProfessorRoutingModule
  ],
  exports: [ProfessorListarComponent, ProfessorFormComponent],
  declarations: [ProfessorMainComponent, ProfessorListarComponent, ProfessorFormComponent, ProfessorCrachaComponent],
  providers:[ProfessorService, HomeService]
})
export class ProfessorModule { }
