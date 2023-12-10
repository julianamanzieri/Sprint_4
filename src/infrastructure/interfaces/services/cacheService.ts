// Define uma interface que descreve a estrutura esperada do cache
interface CacheData {
  [key: string]: string;
}

export class CacheService {
  private cache: CacheData;

  constructor() {
    this.cache = {};
  }

  // Declara o método set, que recebe os parametros e armazena o valor a chave objeto cache
  set(key: string, value: string): void {
    this.cache[key] = value;
  }

  // Declara o método get, que recebe um parametro e retorna o valor associado a chave do objeto cache
  get(key: string): string {
    return this.cache[key];
  }

  // Declara o método remove que recebe um parametro e remove a entrada associada a chave no objeto cache
  remove(key: string): void {
    delete this.cache[key];
  }
}
