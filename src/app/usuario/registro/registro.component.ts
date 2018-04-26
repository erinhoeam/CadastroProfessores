import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ViewContainerRef, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { BaseComponent } from './../../shared/base.component';
import { Usuario } from './../../models/usuario';
import { UsuarioService } from './../../services/usuario.service';
import { HomeService } from './../../services/home.service';

import { GenericValidator } from './../../utils/generic-form-validator';
import { StringUtils } from './../../utils/string.utils';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { CustomValidator } from './../../utils/custom-validator';
import { ToastsManager,Toast } from 'ng2-toastr/ng2-toastr';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  usuario: Usuario;
  formulario: FormGroup;
  public maskCpfCnpj:any;
  public labelCpfCnpj:string;

  constructor(private usuarioService:UsuarioService,
              private homeService:HomeService,
              public toastr: ToastsManager, 
              vcr: ViewContainerRef,
              private routerC: Router,
              private fb:FormBuilder) {
    
    super(toastr,vcr,routerC);
    
    this.validationMessages = {
      email: {
          required: this.message.messages.USUARIO.EMAIL_REQUIRED,
          email: this.message.messages.USUARIO.EMAIL_INVALID
      },
      senha:{
          required: this.message.messages.ALTERAR_SENHA.SENHA_NOVA_REQUIRED,
          minlength: this.message.messages.ALTERAR_SENHA.SENHA_NOVA_MIN_LENGTH
      },
      confirmeSenha:{
          required: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_REQUIRED,
          minlength: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_MIN_LENGTH,
          equalTo: this.message.messages.ALTERAR_SENHA.SENHA_CONFIRME_EQUAL_TO
      }
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();
    this.maskCpfCnpj = this.maskCpf;

  }

  ngOnInit() {
    let senha = new FormControl('', [Validators.required, Validators.minLength(6)]);
    let senhaConfirmacao = new FormControl('', [Validators.required, Validators.minLength(6), CustomValidators.equalTo(senha)]);

    this.formulario = this.fb.group({
      email: ['', [Validators.required,
      CustomValidators.email]], 
      senha: senha,
      confirmeSenha: senhaConfirmacao
    });
    this.title = this.message.titles.USUARIO.TITLE;
  }

  ngAfterViewInit(): void {
    this.validateOnBlur(this.formInputElements,this.formulario);
  }

  save(){

    if (this.formIsValid(this.formulario)){

      let p = Object.assign({}, this.usuario, this.formulario.value);  

      p.cpfcnpj = p.cpfcnpj.replace(/[^\d]+/g,'');

      this.showToastrInfo(this.message.messages.SHARED.MSG_SAVING);

      this.usuarioService.registrarUsuario(p)
      .subscribe(
          result => { this.onCompleteSuccess(result,
            this.message.messages.SHARED.MSG_SAVE_SUCCESS,
            this.message.routes.HOME.INICIAL) },
          error => { this.onError(error) }
      );
    }
    else{
      this.verificaValidacoesForm(this.formulario);
      this.displayMessage = this.genericValidator.processMessages(this.formulario);
    }
  }

  generateRandomPassword(){
    this.homeService.generatePassword()
    .subscribe(
      api => {
        
        this.formulario.patchValue({
          senha: api.password,
          confirmeSenha: api.password
        });
      },
      error => this.errors
    );

  }
}