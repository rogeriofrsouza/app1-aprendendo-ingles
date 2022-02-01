import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { FraseModel } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css'],
})
export class PainelComponent implements OnInit, OnDestroy {

  @ViewChild("myInput") myInputField!: ElementRef;

  public frases: FraseModel[] = FRASES;
  public instrucao: string = 'Traduza a frase:';
  public resposta: string = '';

  public rodada: number = 0;
  public rodadaFrase: FraseModel = {} as FraseModel;

  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();
 
  constructor() { }
  
  ngOnInit(): void {
    this.atualizaRodada();
  }

  ngAfterViewInit(): void {
    this.focus();
  }

  ngOnDestroy(): void {
  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';

    if (this.rodada > 0) {
      this.focus();
    }
  }

  public focus() {
    this.myInputField.nativeElement.focus();
  }

  // Resposta é um objeto do tipo Event
  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    if (this.resposta == this.rodadaFrase.frasePtBr) {

      // Trocar pergunta da rodada
      this.rodada++;

      // Progresso
      this.progresso += (100 / this.frases.length);

      // Encerramento: vitória
      if (this.rodada == 4) {
        this.resposta = ''
        
        setTimeout(() => this.encerrarJogo.emit('vitória'), 2000);
      } else {
        this.atualizaRodada();
      }

    } else {
      // Tentativas
      this.tentativas--;

      // Encerramento: tente novamente
      if (this.tentativas == -1) {
        this.encerrarJogo.emit('tente novamente');
      } else {
        this.atualizaRodada();
      }
    }
  }
}
