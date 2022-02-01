export class Coracao {
  constructor(
    public cheio: boolean,
    public urlCoracaoCheio: string = 'https://bit.ly/32sRIei',
    public urlCoracaoVazio: string = 'https://bit.ly/3GYN2vV',
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