import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http, Response } from "@angular/http";

import { Observable } from 'rxjs/Observable';
import { ServiceBase } from "app/services/service.base";
import { Professor } from './../models/professor';
import { RetornoServico } from './../models/retorno-servico';

@Injectable()
export class ProfessorService extends ServiceBase {

      constructor(private http: Http) { 
      super();
      }

      novo(entity: Professor) : Observable<Professor>{
            let options = this.obterAuthHeader();

            let response = this.http
                  .post(`${this.UrlServiceV1}professor`, entity, options)
                  .map(super.extractData)
                  .catch(super.serviceError);

            return response;
      }
      
      atualizar(entity: Professor) : Observable<Professor>{
            let options = this.obterAuthHeader();

            let response = this.http
                  .put(`${this.UrlServiceV1}professor`, entity, options)
                  .map(super.extractData)
                  .catch(super.serviceError);

            return response;
      }
      
      excluir(id: String) : Observable<Professor>{
            let options = this.obterAuthHeader();

            let response = this.http
                  .delete(`${this.UrlServiceV1}professor/${id}`, options)
                  .map(super.extractData)
                  .catch(super.serviceError);

            return response;
      }

      listar(nome:String, cpf:String, matricula:String, pageNumber:Number,rowsPage:Number) : Observable<RetornoServico>{
            let options = this.obterAuthHeader();

            return this.http.get(`${this.UrlServiceV1}professor-listar/${nome}/${cpf}/${matricula}/${pageNumber}/${rowsPage}`, options)
                              .map(super.extractData)
                              .catch(super.serviceError);
      }
  
      obter(id:String) : Observable<Professor>{
            
            let options = this.obterAuthHeader();

            return this.http.get(`${this.UrlServiceV1}professor/${id}`, options)
                              .map((res:Response) => <Professor>res.json())
                              .catch(super.serviceError);
      }

      cracha(id:String) : Observable<Professor>{
            
            let headers = new Headers({ 'Content-Type': 'application/json' });
            let options = new RequestOptions({ headers: headers });

            return this.http.get(`${this.UrlServiceV1}professor-cracha/${id}`, options)
                              .map((res:Response) => <Professor>res.json())
                              .catch(super.serviceError);
      }
      upload(id:string, file:File) : Observable<Professor>{
            let options = this.obterAuthHeaderUpload();

            let formData:FormData = new FormData();
            formData.append('file', file, file.name);
            formData.append('id', id);

            let response = this.http
            .post(`${this.UrlServiceV1}upload-image`, formData, options)
            .map(super.extractData)
            .catch(super.serviceError);

            return response;
      }
}