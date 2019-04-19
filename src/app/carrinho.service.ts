import {ItemCarrinho} from './shared/item-carrinho.model'
import { Injectable, OnDestroy } from '@angular/core';
import { Oferta } from './shared/oferta.model';

@Injectable()
export class CarrinhoService implements OnDestroy{
    public itens:ItemCarrinho[]=[];

    public exibirItens():ItemCarrinho[]{
        return this.itens;
    }

    public incluirItem(oferta:Oferta){
        let itemCarrinho:ItemCarrinho=new ItemCarrinho(oferta.id,oferta.imagens[0],oferta.titulo, oferta.descricao_oferta,oferta.valor,1);
        
        let itemCarrinhoEncontrado= this.itens.findIndex((item:ItemCarrinho)=>item.id===itemCarrinho.id) //smelhante aos lambda fucntions em c#, aqui o (item:ItemCarrinho) não funciona como um parametro de entrada

        if(itemCarrinhoEncontrado!==-1){
            
            this.itens[itemCarrinhoEncontrado].quantidade+=1;
            //console.log(this.itens);
        }
        else{
            this.itens.push(itemCarrinho);
            //console.log(this.itens);
        }
        

    }

    public totalCarrinhoCompras(){
        let total:number=0;
        this.itens.map((item:ItemCarrinho)=>total=total+(item.valor*item.quantidade))
        return total
    }

    public alterarQuantidade(id:number,operacao:string){
        let itemCarrinhoEncontrado=this.itens.findIndex((item:ItemCarrinho)=>item.id===id);
        if(itemCarrinhoEncontrado!==-1){
            if(operacao==='+'){
                this.itens[itemCarrinhoEncontrado].quantidade+=1;
                

            }
            else{
                
                if( (this.itens[itemCarrinhoEncontrado].quantidade)>0){
                     this.itens[itemCarrinhoEncontrado].quantidade-=1;
                }
                if(this.itens[itemCarrinhoEncontrado].quantidade===0){  
                    this.itens.splice(itemCarrinhoEncontrado,1)
                }
            }
    }
        else{
            console.log("Something went wrong");
        }
    }

    
    ngOnDestroy(){
        this.itens=[];
    }

}