import { IApiSecurity } from "./apiSecurity.model";

export class APISecurity implements IApiSecurity {
  constructor(
    public clientId: string = "",
    public clientSecret: string = "",
    public x509cert: string = ""
  ) {}
}
