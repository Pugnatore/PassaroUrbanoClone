import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from '../ordem-compra.service'
import { Pedido } from '../shared/pedido.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarrinhoService } from '../carrinho.service';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService]
})
export class OrdemCompraComponent implements OnInit {

  public itensCarrinho:ItemCarrinho[]=[];
  public idPedidoCompra:number;
  //formGroup e o nome do formulario que neste caso e 'formulario'
  public formulario:FormGroup=new FormGroup({
    'endereco':new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(120)]),
    'numero':new FormControl(null,[Validators.required, Validators.minLength(0), Validators.maxLength(20)]),
    'complemento':new FormControl(null),
    'formaPagamento':new FormControl(null,[Validators.required])
  });
  constructor(private ordemCompraService: OrdemCompraService, private carrinhoService:CarrinhoService) { }

  ngOnInit() {

    
    this.itensCarrinho=this.carrinhoService.exibirItens();
    console.log(this.itensCarrinho);
    
  }

  public confirmarCompra(): void {  
    let pedido:Pedido=new Pedido(this.formulario.value.endereco,this.formulario.value.numero, this.formulario.value.complemento, this.formulario.value.formaPagamento, this.carrinhoService.exibirItens())
    this.ordemCompraService.efetivarCompra(pedido).subscribe((idPedido:number)=>{this.idPedidoCompra=idPedido
                                                              this.carrinhoService.ngOnDestroy()})
  }
}
