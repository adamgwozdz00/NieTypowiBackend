export class AuthenticationResult {
  private constructor(
      private _success: boolean,
      private _token: string,
      private _iat: number,
      private _exp: number,
      private _failReason: string
  ) {
  }

  get success(): boolean {
    return this._success;
  }

  get token(): string {
    return this._token;
  }

  get iat(): number {
    return this._iat;
  }

  get exp(): number {
    return this._exp;
  }

  get failReason(): string {
    return this._failReason;
  }

  static createSuccess(token: string, iat: number, exp: number): AuthenticationResult {
    return new AuthenticationResult(true, token, iat, exp, "");
  }

  static createFail(failReason: string): AuthenticationResult {
    return new AuthenticationResult(false, null, null, null, failReason);
  }
}