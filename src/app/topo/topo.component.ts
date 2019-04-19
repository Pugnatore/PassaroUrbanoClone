import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Observable, Subject, of } from 'rxjs';
import { Oferta } from '../shared/oferta.model';
import { switchMap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers:[OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas:Observable<Oferta[]>// nota que esta variavel é do mesmo tipo que e retornado pela função pesquisaOfertas do ofertasService
  private subjectPesquisa:Subject<string>=new Subject<string>()
  constructor(private ofertasService:OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000),
      distinctUntilChanged(), //evita que faça um novo pedido se o termo for igual ao termo anterior
      switchMap((termo: string) => {
        if(termo.trim()===''){
          //return observable de array de ofertas vazio
          return of<Oferta[]>([]);
        }
        else{
          return this.ofertasService.pesquisaOfertas(termo);
        }
        
      }),catchError((erro:any)=>{ console.log(erro);
                                  return of<Oferta[]>([]);
                                }
                    )
        ); 

   
  }



  public pesquisa(termoDaBusca:string):void{
      this.subjectPesquisa.next(termoDaBusca)
  }

 public limpaPesquisa():void{
   this.subjectPesquisa.next('');
 }



}
