import {Oferta} from './shared/oferta.model'
import {Http,Response} from '@angular/http'
import { Injectable } from '@angular/core';
import { httpFactory } from '@angular/http/src/http_module';
import { URL_API } from './app.api';
import { Observable } from 'rxjs';

import 'rxjs/operator/toPromise'
import 'rxjs/operator/map'
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';

@Injectable()
export class OfertasService{
   
    //private url_api="http://localhost:3000/ofertas"
    constructor(private http:Http) {
        
        
    }
    


    public getOfertas():Promise<Oferta[]>{
          return this.http.get(`${URL_API}/ofertas?destaque=true`).toPromise().then((resposta:Response)=>resposta.json()) //o to promisse e usado porque a resposta que vem do servidor e um observable, e como ainda noa falamos em observables no curso entao e necessario converte-lo em promisse  
    }

    // public getOfertas2():Promise<Oferta[]>{
    //     return new Promise((resolve,reject)=>{
    //         //algum tipo de processamento que ao finalizar chama a função de resolve ou função de reject
    //         let deu_certo=true;
    //         if(deu_certo){
    //             setTimeout(()=>resolve(this.ofertas),3000)//quando esiver resolvida passa para o then, (vai demorar 3 segundos). fazemos ()=>resolve(this.oferatas), porque o result funciona mais ou menos como um return, logo se nao o encapsulassemos dentro de uma função ela ia ser retornada antes de ser atribuido o timeout

    //         }
    //         else{
    //         reject({codigo_erro:404,mensagem_erro:'Servidor nao encontrado'})
    //         }

    //     }).then((ofertas:Oferta[])=>{
    //         //pode fazer alguma tratativa
    //         console.log("primeiro then a ser executado")
    //         return this.ofertas;
    //     }).then((ofertas:Oferta[])=>{ //este then so e executado apos o primeiro then terminar
    //         console.log("segundo the a ser executado");
    //         return new Promise((resolve2,reject2)=>{
    //             setTimeout(()=>{resolve2(ofertas)},3000)
    //         }).then((ofertas:Oferta[])=>{
    //             console.log("terceiro then executado apos 3 segundos");
    //             return ofertas;
    //         })
    //     });   
    // }

    public getOfertasPorCategoria(categoria:string):Promise<Oferta[]>{
        //aqui nao usamos o resolve e o reject porque isso apenas e efetuado do lado onde o promisse e lançado, o que neste caso e do lado do servidor. Do nosso lado so fazemos o then para caso seja feito o resolve do lado do servidor, o captarmos do nosso lado
        return this.http.get(`${URL_API}/ofertas?categoria=${categoria}`).toPromise().then((resposta:Response)=>resposta.json())
    }
    
    public GetOfertaPorId (id:number):Promise<Oferta> {
        return this.http.get(`${URL_API}/ofertas?id=${id}`)
        .toPromise()
        .then((resposta:Response)=>{
        // console.log(resposta.json.shift()) //o shift() extrai apenas a posição 0 do array
           return resposta.json()[0];
        })
    }

   
    public getComoUsarOfertaPorId(id:number):Promise<string> {
        return this.http.get(`${URL_API}/como-usar?id=${id}`).toPromise().then((resposta:Response)=>{
            //console.log(resposta.json()[0].descricao)
            return resposta.json()[0].descricao})
        
    }
    /**
     * name
     */
    public getOndeFicaOfertaPorId (id:number):Promise<string> {
        return this.http.get(`${URL_API}/onde-fica?id=${id}`).toPromise().then((resposta:Response)=>
        {
            //console.log(resposta.json()[0]);
            return resposta.json()[0].descricao;
        })
        
    }

    public pesquisaOfertas(termo:string):Observable<Oferta[]>{
        //o map tem como objectivo recuperar a resposta e efetuar uma transformação (semelhante ao then das promisses)
        //return this.http.get(`${URL_API}/ofertas?descricao_oferta=${termo}`).map((resposta:any)=>{resposta.json()})

        //"o _like serve para fazer uma pesquisa do tipo like, e nao e preciso escrever os dados exatamente como estes estao no json"
        return this.http.get(`${URL_API}/ofertas?descricao_oferta_like=${termo}`).pipe(map((resposta: Response)=> {return resposta.json()}),retry(10))

    
    }
    

}