import {Pedido} from './shared/pedido.model'
import{Injectable} from '@angular/core'
import { Observable } from 'rxjs';
import {URL_API} from './app.api'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class OrdemCompraService{
    
    
   

    constructor(private http:HttpClient) { //a partir da versao 6 do angular e necessario importar HttpClient em vez to HTTP ver as diferenças que isso implica no codigo abaixo no link ---> //https://blog.fullstacktraining.com/angular-http-vs-httpclient/ 
        
        
    }
    public efetivarCompra(pedido:Pedido):Observable<number>{
        
        //let header_criado_por_mim: HttpHeaders = new HttpHeaders()
       // header_criado_por_mim.append('Content-type','application.json') //informamos a api que vai ser enviado um json e não um urlencoded(valor por padrao)

        return this.http.post(`${URL_API}/pedidos`,pedido/*,({headers: header_criado_por_mim})*/).pipe( 
            map((resposta: any) => resposta.id) 
          ); //a parte que esta comentada aqui so e necesaria para versoes do angular <4, para versoes >4, o httpcliente ja assume por predifinição que o content type ja e do tipo json
    }
}