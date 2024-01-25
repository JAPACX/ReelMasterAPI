export class GithubRepositoryEntity {
  constructor(
    public id?: number,
    public name?: string,
    public fullName?: string,
    public owner?: Owner,
    public htmlUrl?: string
  ) {}
}

export class License {
  constructor(
    public key?: string,
    public name?: string,
    public spdxId?: string,
    public url?: string,
    public nodeId?: string
  ) {}
}

export class Owner {
  constructor(public login?: string, public id?: number) {}
}
