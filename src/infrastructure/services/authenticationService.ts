interface Credentials {
  username: string;
  password: string;
}

export class AuthenticationService {
  private validCredentials: Credentials[];

  constructor(validCredentials: Credentials[]) {
    this.validCredentials = validCredentials;
  }

  // Declara o método authenticate, que recebe um username e uma password como parametros
  authenticate(username: string, password: string): boolean {
    // Utiliza o método some para verificar se há pelo menos um conjunto de credenciais no array que corresponde ao username e à password fornecidos
    const isValid = this.validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );
    return isValid;
  }
}
