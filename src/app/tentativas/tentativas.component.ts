import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { Coracao } from '../shared/coracao.model'

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  @Input() public tentativas: number = 3;

  public coracoes: Coracao[] = [new Coracao(true), new Coracao(true), new Coracao(true)];
  
  constructor() { }

  ngOnChanges(): void {
    if (this.tentativas != this.coracoes.length) {
      let indice = (this.coracoes.length - this.tentativas) - 1;
      
      this.coracoes[indice].cheio = false;
    }
  }

  ngOnInit(): void {
  }

}
