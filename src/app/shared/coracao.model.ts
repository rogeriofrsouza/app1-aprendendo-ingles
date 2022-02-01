export class Coracao {
  constructor(
    public cheio: boolean,
    public urlCoracaoCheio: string = '../../assets/coracao-cheio.png',
    public urlCoracaoVazio: string = '../../assets/coracao-vazio.png',
    public alt: string = 'Coração cheio'
  ) { }  

  public exibeCoracao(): string {
    if (this.cheio) {
      this.alt = 'Coração cheio'
      return this.urlCoracaoCheio;

    } else {
      this.alt = 'Coração vazio'
      return this.urlCoracaoVazio;
    }
  }
}