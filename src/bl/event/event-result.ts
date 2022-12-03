export class EventResult {
  private constructor(private readonly _success: boolean,
                      private readonly _reason: string) {
  }

  get success(): boolean {
    return this._success;
  }

  get reason(): string {
    return this._reason;
  }

  static createSuccess(): EventResult {
    return new EventResult(true, "");
  }

  static createFail(reason: string): EventResult {
    return new EventResult(false, reason);
  }
}