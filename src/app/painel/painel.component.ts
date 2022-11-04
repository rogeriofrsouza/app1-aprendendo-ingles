import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit {

  @ViewChild("myInput") myInput!: ElementRef;

  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase:';
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: Frase = {} as Frase;

  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.atualizaRodada();
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';

    setTimeout(() => this.myInput.nativeElement.focus());
  }

  // resposta é um objeto do tipo Event
  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    if (this.resposta == this.rodadaFrase.frasePtBr) {
      // trocar rodada
      this.rodada++;

      // Progresso
      this.progresso += (100 / this.frases.length);

      // encerramento: vitória
      if (this.rodada == 4) {
        this.resposta = '';

        setTimeout(() => this.encerrarJogo.emit('vitória'), 2000);
      }
    } else {
      // Tentativas
      this.tentativas--;

      // encerramento: tente novamente
      if (this.tentativas == -1)
        this.encerrarJogo.emit('tente novamente')
    }

    this.atualizaRodada();
  }
}
