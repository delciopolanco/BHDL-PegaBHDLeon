export interface IStorage {
  getFromStorage: (key: string) => Promise<any>;
  setInStorage: (key: string, data: any) => Promise<any>;
  removeInStorage: (keys: string[]) => Promise<any>;
}
