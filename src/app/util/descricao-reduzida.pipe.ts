import {PipeTransform, Pipe} from '@angular/core'


@Pipe({
    name:'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform{
transform(texto:string, truncarEm:number):string{ //oferta.titulo|descricaoReduzida:7--> o oferta.titulo entra no primeiro parametro e o 7 entra no parametro troncarEm 
    if(texto.length>truncarEm){
        return texto.substr(0,truncarEm) +'...'
    }
    else{
        return texto;
    }
}
}