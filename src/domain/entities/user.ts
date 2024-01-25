export class User {
  constructor(
    public user_id?: string,
    public name?: string,
    public last_name?: string,
    public username?: string,
    public email?: string,
    public password_hash?: string
  ) {}
}
