import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BaseComponent } from "./../../shared/base.component";
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import { RetornoServico } from '../../models/retorno-servico';

@Component({
  selector: 'app-professor-listar',
  templateUrl: './professor-listar.component.html',
  styleUrls: ['./professor-listar.component.scss']
})
export class ProfessorListarComponent extends BaseComponent implements OnInit {

  public professores:Professor[];
  formulario: FormGroup;

  constructor(private professorService:ProfessorService,
              public toastr: ToastsManager, 
              private routerC: Router,
              private fb:FormBuilder,
              vcr: ViewContainerRef) {
              super(toastr,vcr,routerC);
    this.title = this.message.titles.PROFESSOR.TITLE_LIST;
  }

  ngOnInit() {

    this.formulario = this.fb.group({
      nome: '',
      cpf: '',
      matricula: ''
    });

    this.listarProfessores(1);
  }

  onListarComplete(entities: RetornoServico) {
    
    this.professores = entities.objeto as Professor[];
    this.totalRegistros = entities.totalRegistros;
    this.hideToastrInfo();
    this.errors = [];
  }

  listarProfessores(pagina:Number){
    
    this.showToastrInfo(this.message.messages.SHARED.MSG_LISTING);
    let nome:String = this.formulario.get("nome").value == '' ? '%20' : this.formulario.get("nome").value;
    let cpf:String = this.formulario.get("cpf").value == '' ? '%20' : this.formulario.get("cpf").value;;
    let matricula:String = this.formulario.get("matricula").value == '' ? '%20' : this.formulario.get("matricula").value;;

    this.professorService.listar(nome,cpf,matricula,pagina,this.rowsPage)
    .subscribe(
      response => { this.onListarComplete(response) },
      error => { this.onError(error) });
  }
}
