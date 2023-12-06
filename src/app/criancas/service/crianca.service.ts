import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs";
import { environment } from "src/environments/environment";
import { CriancaModel } from "../modelo/crianca.model";

@Injectable({
  providedIn: 'root'
})
export class CriancaApiService{
  protected readonly pathApi = `${environment.url.service}`

  constructor(protected http: HttpClient){}

  inserirCrianca(crianca: CriancaModel){
    return this.http.post(`${this.pathApi}/crianca`, crianca).pipe(take(1))
  }

  editarCrianca(id: string, crianca: CriancaModel){
    return this.http.put(`${this.pathApi}/crianca/${id}`, crianca).pipe(take(1))
  }

  deletarRegistroCrianca(id?: string){
    return this.http.delete(`${this.pathApi}/crianca/${id}`).pipe(take(1))
  }

  listarCriancas(){
    return this.http.get(`${this.pathApi}/crianca`).pipe(take(1))
  }

  detalharCrianca(id?: string){
    return this.http.get(`${this.pathApi}/crianca/${id}`).pipe(take(1))
  }
}
