import { Component, OnInit } from '@angular/core';
import{ OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [OfertasService] //o serviço fica disponivel para o componente e para os componentes filhos deste componente
})
export class HomeComponent implements OnInit {

  public ofertas:Oferta[];

  constructor(private ofertasService: OfertasService) { } //cria automaticamente a variavel do tipo OfertasService e instacia-a

  ngOnInit() {
    //this.ofertas=this.ofertasService.getOfertas(); 
    //o then executa uma ação quando a promessa estiver resolvida, que neste caso vai receber como parametro a oferta que e enviada a partir do promise e executa uma arrow function
    //o then esta sempre ligado ao resolve e o catch ao reject
    this.ofertasService.getOfertas().then((ofertas:Oferta[])=>{ this.ofertas=ofertas;}).catch((param:any)=>{console.log(param)}); 
                            //o primeiro parametro do then esta associado ao resolve e o .catch esta associado ao reject e e tambem uma arrow function que recebe um param:any re faz o console.log desse param se ocorrer um reject                        
           
                             
    }

}
