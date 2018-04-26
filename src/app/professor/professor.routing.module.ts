import { ProfessorFormComponent } from './professor-form/professor-form.component';
import { CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthService } from './../shared/auth.service';
import { ProfessorMainComponent } from './professor-main/professor-main.component';
import { ProfessorListarComponent } from './professor-listar/professor-listar.component';
import { ProfessorCrachaComponent } from './professor-cracha/professor-cracha.component';

const ROUTES: Routes = [
    { path: '', canActivate: [AuthService], component: ProfessorMainComponent, 
    children:[
    { path: 'listar', canActivate: [AuthService], component: ProfessorListarComponent, data: [{ claim: { nome: 'Professor', valor: 'Ler' } }] },  
    { path: 'novo', canActivate: [AuthService], component: ProfessorFormComponent, data: [{ claim: { nome: 'Professor', valor: 'Gravar' } }] },
    { path: 'editar/:id', canActivate: [AuthService], component: ProfessorFormComponent, data: [{ claim: { nome: 'Professor', valor: 'Gravar' } }] },
    { path: 'cracha/:id', component: ProfessorCrachaComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
  })
  export class ProfessorRoutingModule { }
