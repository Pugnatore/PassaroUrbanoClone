import { Component, OnInit } from '@angular/core';
import {Oferta} from '../shared/oferta.model';
import {OfertasService} from '../ofertas.service'

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers:[OfertasService]//não esquecer de colocar aqui o serviço
})
export class RestaurantesComponent implements OnInit {

  public ofertas:Oferta[];
  constructor(private ofertasService:OfertasService) { }

  ngOnInit() {
    this.ofertasService.getOfertasPorCategoria('restaurante').then((ofertas:Oferta[])=>{this.ofertas=ofertas});
  }

}
