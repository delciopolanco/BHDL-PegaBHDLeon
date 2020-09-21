import { Injectable } from "@angular/core";
import { IStorage } from "../../_models/iStorage.model";

@Injectable()
export class HandleStorageService implements IStorage {
  public service: IStorage;

  constructor() {}

  public getFromStorage(key: string): any {
    let dbKey = localStorage.getItem(key);
    dbKey = JSON.parse(dbKey);

    if (!dbKey) {
      return null;
    }

    return dbKey;
  }

  public setInStorage(key: string, data: any): any {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public removeInStorage(keys: string[]): any {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  }
}
