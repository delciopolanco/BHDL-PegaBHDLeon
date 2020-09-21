import { Injectable } from "@angular/core";
import * as uuid from "uuid";
import * as Forge from "node-forge";
import * as CryptoJS from "crypto-js";
import { HandleStorageService } from "./handleStorage.service";
import { IApiSecurity } from "../../_models/apiSecurity.model";
import { APISecurity } from "../../_models/iApiSecurity.model";
import { GeneratedUUID } from "../../_models/generateUUID.model";

Forge.options.usePureJavaScript = true;
const PKI = Forge.pki;

@Injectable()
export class EncryptDecryptService {
  private _uuid = new GeneratedUUID();
  private _securityData: IApiSecurity;

  constructor(private handleStorageService: HandleStorageService) {}

  get uuid(): GeneratedUUID {
    return this._uuid;
  }

  set uuid(emptyuuid: GeneratedUUID) {
    this._uuid = emptyuuid;
  }

  get securityData(): APISecurity {
    return this._securityData;
  }

  /**
   * TODO: El uuid deber ser diferente para cada request
   */
  public getKey(enrolling: boolean = false) {
    if (this._uuid.generated) {
      return this._uuid;
    }

    if (!this._uuid.generated) {
      const credentials = JSON.parse(
        this.handleStorageService.getFromStorage("credentials")
      ) as IApiSecurity;

      console.log(credentials);
      this._securityData = enrolling ? new APISecurity() : credentials;
      const localUUID = uuid.v1().split("-").join("");
      const decodeCert = atob(this._securityData.x509cert);
      const certificate = PKI.certificateFromPem(decodeCert);
      const encrypted = certificate.publicKey.encrypt(localUUID, "RSA-OAEP", {
        md: Forge.md.sha256.create(),
        mgf1: {
          md: Forge.md.sha1.create(),
        },
      });

      this._uuid = { key: localUUID, xkey: btoa(encrypted), generated: true };
      return this._uuid;
    }
  }

  public encrypt(plainText: string): string {
    console.log(this.uuid);
    const iv = CryptoJS.lib.WordArray.create(
      this._uuid.key.substring(0, 16)
    ).toString();
    const encrypted = CryptoJS.AES.encrypt(plainText, this._uuid.key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });

    return encrypted.toString();
  }

  public decrypt<T>(encrypted: string): T {
    const iv = CryptoJS.lib.WordArray.create(
      this._uuid.key.substring(0, 16)
    ).toString();
    const decrypted = CryptoJS.AES.decrypt(encrypted, this._uuid.key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
    });

    try {
      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
      const data = decryptedData ? JSON.parse(decryptedData) : "";
      return <T>data;
    } catch (e) {
      console.log(e);
      return e;
    }
  }
}
