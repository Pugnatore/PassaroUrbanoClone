import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {OfertasService} from '../ofertas.service'
import { Oferta } from '../shared/oferta.model';
import { observable, Observable, Observer, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { OrdemCompraService } from '../ordem-compra.service';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[OfertasService]
})
export class OfertaComponent implements OnInit {

  private tempoObservableSubscription:Subscription //devemos criar sempre uma variavel do tipo subscription e preenche-lo com os sbscribe para depois no ngOnDestroy fazer o unsubscribe
  private meuObservableTesteSubscription:Subscription
public oferta:Oferta
  constructor(
    private route:ActivatedRoute,
    private ofertasService:OfertasService,
    private carrinhoService:CarrinhoService) { 
    
  }

  ngOnInit() {

    //console.log('ID recuperado '+this.route.snapshot.params['id']); //recupera os parametros do URL 
      //ou
    // this.route.params.subscribe((parametro:any)=>console.log(parametro.id))

    this.route.params.subscribe((parametros:Params)=>{
      
      this.ofertasService.GetOfertaPorId(parametros.id).then((oferta:Oferta)=>{
        //console.log(oferta);
        this.oferta=oferta;
      });
    })


  }


  AdicionarItemCarrinho():void{
    this.carrinhoService.incluirItem(this.oferta);
    console.log(this.carrinhoService.exibirItens());
  }

}
