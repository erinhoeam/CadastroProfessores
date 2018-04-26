import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewContainerRef, OnDestroy, AfterViewInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';

import { BaseComponent } from './../../shared/base.component';

import { Professor } from './../../models/professor';
import { ProfessorService } from './../../services/professor.service';
import { HomeService } from './../../services/home.service';

import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';
import { GenericValidator } from './../../utils/generic-form-validator';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { DateUtils } from './../../utils/date-utils';
import { ScrollToService } from 'ng2-scroll-to-el';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-professor-form',
  templateUrl: './professor-form.component.html',
  styleUrls: ['./professor-form.component.scss']
})
export class ProfessorFormComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
             @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
             @ViewChild('target') target: ElementRef;

  
  inscricao: Subscription;
  formulario: FormGroup;
  professor:Professor;
  myDatePickerOptions = DateUtils.getMyDatePickerOptions(false);
  public maskCpf:any;
  public estados:any[];
  public fileList:FileList;
  public imagem:String;

  constructor(public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private routeActivated: ActivatedRoute,
              private fb:FormBuilder,
              private professorService:ProfessorService,
              private homeService:HomeService,
              private scrollService:ScrollToService) { 
      
      super(toastr,vcr,routerC);
      
      this.validationMessages = {
        nome: {
            required: this.message.messages.PROFESSOR.NOME_REQUIRED,
            minlength: this.message.messages.PROFESSOR.NOME_MIN_LENGTH,
            maxlength: this.message.messages.PROFESSOR.NOME_MAX_LENGTH
        },
        cpf: {
            required: this.message.messages.PROFESSOR.CPF_REQUIRED,
            minlength: this.message.messages.PROFESSOR.CPF_MIN_LENGTH,
            maxlength: this.message.messages.PROFESSOR.CPF_MAX_LENGTH,
            validCPF: this.message.messages.PROFESSOR.CPF_INVALID
        },
        dataNascimento: {
          required: this.message.messages.PROFESSOR.DATA_NASCIMENTO_REQUIRED,
        },
        matricula: {
          required: this.message.messages.PROFESSOR.MATRICULA_REQUIRED,
        },
        classe: {
          required: this.message.messages.PROFESSOR.CLASSE_REQUIRED,
        },
        nivel: {
          required: this.message.messages.PROFESSOR.NIVEL_REQUIRED,
        },
        dataAdmissao: {
          required: this.message.messages.PROFESSOR.DATA_ADMISSAO_REQUIRED,
        },
        cargo: {
          required: this.message.messages.PROFESSOR.CARGO_REQUIRED,
        },
        rg: {
          required: this.message.messages.PROFESSOR.RG_REQUIRED,
        },
        nacionalidade: {
          required: this.message.messages.PROFESSOR.NACIONALIDADE_REQUIRED,
        },
        sexo: {
          required: this.message.messages.PROFESSOR.SEXO_REQUIRED,
        },
        ensinoMedio: {
          required: this.message.messages.PROFESSOR.ENSINO_MEDIO_REQUIRED,
        },
        graduacao: {
          required: this.message.messages.PROFESSOR.GRADUACAO_REQUIRED,
        },
        naturalidade: {
          required: this.message.messages.PROFESSOR.NATURALIDADE_REQUIRED,
        },
        lotacao: {
          required: this.message.messages.PROFESSOR.LOTACAO_REQUIRED,
        },
        areaDeAtuacao: {
          required: this.message.messages.PROFESSOR.AREA_ATUACAO_REQUIRED,
        },
        ensinoFundamentalAnosFinais: {
          required: this.message.messages.PROFESSOR.ENSINO_FUNDAMENTAL_ANOS_FINAIS_REQUIRED,
        },
      };
      this.professor = new Professor();
      this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {

        this.formulario = this.fb.group({
          nome: ['', [Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150)]],
          cpf: ['', [Validators.required,
          CustomValidator.CPFValidator]],
          dataNascimento:['',Validators.required],
          matricula:['',Validators.required],
          classe:['',Validators.required],
          nivel:['',Validators.required],
          dataAdmissao:['',Validators.required],
          cargo:['',Validators.required],
          rg:['',Validators.required],
          nacionalidade:['',Validators.required],
          sexo:['',Validators.required],
          lotacao:['',Validators.required],
          areaDeAtuacao:['',Validators.required],
          ensinoFundamentalAnosFinais:['',Validators.required],
          ensinoMedio:['',Validators.required],
          graduacao:['',Validators.required],
          naturalidade:['',Validators.required],
          cargaHoraria: 0,
          pis: '',
          tituloEleitor:'',
          estadoCivil:'',
          endereco:'',
          cep:'',
          cidade:'',
          bairro:'',
          estado:'',
          nomePai:'',
          nomeMae:'',
          secretariaDeEducacao:'',
          gestaoEscolar:'',
          temEspecializacao:false,
          especializacao:'',
          temMestrado:false,
          mestrado:'',
          temDoutorado:false,
          doutorado:'',
          contatos:'',
          regimeDoOutroVinculo:'',
          vinculo:'',
          readaptado:false,
          outroVinculoEmpregaticio:false
        });

        this.listarUf();
        
        this.inscricao = this.routeActivated.params.subscribe(
        (params:any) => {
            
            if(params['id']){

              this.title = this.message.titles.PROFESSOR.TITLE_UPDATE;
              this.icon = this.message.titles.ICON.EDIT;

              this.professor.id = params['id'];
              
              this.showToastrInfo(this.message.messages.SHARED.MSG_LOADING);

              this.professorService.obter(this.professor.id)
              .subscribe(
                  result => { this.onObterComplete(result) },
                  error => { this.onError(error) }
              );
            }
            else{
              this.title = this.message.titles.PROFESSOR.TITLE_NEW;
              this.icon = this.message.titles.ICON.NEW;
            }
        }
    );
    this.professor = new Professor();
      this.genericValidator = new GenericValidator(this.validationMessages);
    
  }
  onObterComplete(response: Professor) {
    this.loading = false;
    this.hideToastrInfo();
    this.errors = [];
    this.professor = response;
    this.populaDadosForm(this.professor);
  }
  ngAfterViewInit(): void {
    this.validateOnBlur(this.formInputElements,this.formulario);
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }
  save(){
    
    if (this.formIsValid(this.formulario)){

      let p = Object.assign({}, this.professor, this.formulario.value);
      p.dataNascimento = DateUtils.getMyDatePickerDate(p.dataNascimento);
      p.dataAdmissao = DateUtils.getMyDatePickerDate(p.dataAdmissao);
      p.cpf = p.cpf.replace(/\D/g,'');
      
      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      if (this.professor.id){
          this.professorService.atualizar(p)
          .subscribe(
          result => { 
            this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            this.message.routes.PROFESSOR.LISTAR);
          },
          error => { this.onError(error) });
      }
      else
      {
          this.professorService.novo(p)
          .subscribe(
          result => { this.onCompleteSuccess(result, 
            this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
            null);
            this.professor = result;
            this.imagem = this.professor.sexo == 'M' ? '../../../assets/masculino.png' : '../../../assets/feminino.png'; },
            error => { this.onError(error);
                      this.scrollToElement(this.target); 
           });
      }
    }
    else
    {
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }
  private resetarFormulario(){
    this.formulario.reset();
    this.professor = new Professor();
  }
  listarUf(){
    this.homeService.listarUf()
    .subscribe(
        result => { this.onCompleteListarUf(result) },
        error => { this.onError(error) }
    );
  }
  onCompleteListarUf(response: any) {
    this.estados = response;
    this.errors = [];
  }
  consultaCEP() {
    if (this.formulario.get('endereco').value == null || this.formulario.get('endereco').value == ""){

      let cep = this.formulario.get('cep').value;
      
      //Verifica se campo cep possui valor informado.
      if (cep) {
        //Nova variável "cep" somente com dígitos.
        cep = cep.replace(/\D/g, '');
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/
        if (validacep.test(cep)) {
          this.homeService.consultarCep(cep)
          .subscribe(dados => this.populaDadosForm(dados));
        }
      }
    }
  }
  populaDadosForm(entity:Professor) {
    let dataNascimento = new Date(entity.dataNascimento);
    let dataAdmissao = new Date(entity.dataAdmissao);
    this.formulario.patchValue({
      nome: entity.nome,
      cpf: entity.cpf,
      dataNascimento:{ date: {
        year: dataNascimento.getFullYear(),
        month: dataNascimento.getMonth()+1,
        day: dataNascimento.getDate() 
      }},
      matricula:entity.matricula,
      classe:entity.classe,
      nivel:entity.nivel,
      dataAdmissao:{ date: {
        year: dataAdmissao.getFullYear(),
        month: dataAdmissao.getMonth()+1,
        day: dataAdmissao.getDate() 
      }},
      cargo:entity.cargo,
      rg:entity.rg,
      nacionalidade:entity.nacionalidade,
      sexo:entity.sexo,
      lotacao:entity.lotacao,
      areaDeAtuacao:entity.areaDeAtuacao,
      ensinoFundamentalAnosFinais:entity.ensinoFundamentalAnosFinais,
      ensinoMedio:entity.ensinoMedio,
      graduacao:entity.graduacao,
      naturalidade:entity.naturalidade,
      cargaHoraria: entity.cargaHoraria,
      pis: entity.pis,
      tituloEleitor:entity.tituloEleitor,
      estadoCivil:entity.estadoCivil,
      endereco:entity.endereco,
      cep:entity.cep,
      cidade:entity.cidade,
      bairro:entity.bairro,
      estado:entity.estado,
      nomePai:entity.nomePai,
      nomeMae:entity.nomeMae,
      secretariaDeEducacao:entity.secretariaDeEducacao,
      gestaoEscolar:entity.gestaoEscolar,
      temEspecializacao:entity.temEspecializacao,
      especializacao:entity.especializacao,
      temMestrado:entity.temMestrado,
      mestrado:entity.mestrado,
      temDoutorado:entity.temDoutorado,
      doutorado:entity.doutorado,
      contatos:entity.contatos,
      regimeDoOutroVinculo:entity.regimeDoOutroVinculo,
      vinculo:entity.vinculo,
      readaptado:entity.readaptado,
      outroVinculoEmpregaticio:entity.outroVinculoEmpregaticio
    });
    if (entity.imagem == null){
      this.imagem = entity.sexo == 'M' ? '../../../assets/masculino.png' : '../../../assets/feminino.png';
    }
    else{
      this.imagem = `${this.urlImagem}${entity.imagem}`;
    }
    
  }
  uploadImage(){
    if (this.fileList != null && this.fileList.length >0){
      this.loading = true;
      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      let file = this.fileList[0];

      this.professorService.upload(<string>this.professor.id,file)
            .subscribe(
            result => { this.onCompleteSuccess(result, 
              this.message.messages.SHARED.MSG_SAVE_SUCCESS ,
              null);
              this.fileList = null;
              this.imagem = `${this.urlImagem}${result.imagem}`;
            },
            error => { this.onError(error) });
    }
  }
  scrollToElement(element) {
    this.scrollService.scrollTo(element);
  }
  fileChange(event) {
    this.fileList = event.target.files;
  }
}
