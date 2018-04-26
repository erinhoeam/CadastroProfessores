import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewContainerRef, } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Professor } from './../../models/professor';
import { ProfessorService } from './../../services/professor.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-professor-cracha',
  templateUrl: './professor-cracha.component.html',
  styleUrls: ['./professor-cracha.component.scss']
})
export class ProfessorCrachaComponent extends BaseComponent implements OnInit, OnDestroy {

  inscricao: Subscription;
  professor:Professor;
  public imagem:String;
  
  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,          
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private professorService:ProfessorService) {
        super(toastr,vcr,routerC);
        this.professor = new Professor();
     }

  ngOnInit() {
    this.inscricao = this.routeActivated.params.subscribe(
      (params:any) => {
          
          if(params['id']){

            this.title = this.message.titles.PROFESSOR.TITLE_CRACHA;

            this.professor.id = params['id'];
            
            this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

            this.professorService.cracha(this.professor.id)
            .subscribe(
                result => { this.onObterComplete(result) },
                error => { this.onError(error) }
            );
          }
      }
    );
  }
  onObterComplete(response: Professor) {
    this.loading = false;
    this.hideToastrInfo();
    this.professor = response;
    if (this.professor.imagem == null){
      this.imagem = this.professor.sexo == 'M' ? '../../../assets/masculino.png' : '../../../assets/feminino.png';
    }
    else{
      this.imagem = `${this.urlImagem}${this.professor.imagem}`;
    }
  }
  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
}
