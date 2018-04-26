import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {SelectModule} from 'ng2-select';
import { MyDatePickerModule } from 'mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TemplateControlFormErrorComponent } from './templates/template-control-form-error/template-control-form-error.component';
import { TemplateFormControlSummaryComponent } from './templates/template-form-control-summary/template-form-control-summary.component';
import { CodeBarFebrabanComponent } from './code-bar-febraban/code-bar-febraban.component';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { CpfPipe } from './../pipes/cpf-mask';

import { CommonService } from './../services/common.service';

@NgModule({
  imports: [CommonModule,
           ReactiveFormsModule,
           BsDropdownModule.forRoot(),
           CollapseModule,
           RouterModule,
           ModalModule,
           SelectModule,
           MyDatePickerModule,
           TextMaskModule,
           CurrencyMaskModule],

  exports: [CommonModule,
            SelectModule,
            MyDatePickerModule,
            ReactiveFormsModule,
            ModalModule,
            MenuSuperiorComponent,
            SidebarComponent,
            TemplateControlFormErrorComponent,
            TemplateFormControlSummaryComponent,
            TextMaskModule,
            CurrencyMaskModule,
            CodeBarFebrabanComponent,
            PaginacaoComponent,
            CpfPipe],

  declarations: [TemplateControlFormErrorComponent, 
                 TemplateFormControlSummaryComponent,
                MenuSuperiorComponent,
                SidebarComponent,
                CodeBarFebrabanComponent,
                PaginacaoComponent,
                CpfPipe],
  providers:[CommonService]
})
export class SharedModule { }
