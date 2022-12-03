export class UserId {
  constructor(private _userId: number) {
  }


  get userId(): number {
    return this._userId;
  }
}