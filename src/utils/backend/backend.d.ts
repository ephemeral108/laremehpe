// This file contains the backend class and related interfaces
export declare class backend {
  constructor(): backend;
  static instance: myBack;
  static getInstance: () => myBack;
}

interface myBack {
  fetchPlaceholders: () => Promise<result>;
  setPlaceholders: (val: Array<{ key: string; url: string }>) => Promise<void>;
  fetchMemo: () => Promise<{ get: (val: string) => Array<memoItem> }>;
  updateMemo: (val: Array<memoItem>) => Promise<object>;
  copy: () => Promise<result>;
  paste: (val: string) => Promise<object>;
  createObj: (val: Array<any>) => Promise<{ id: string }>;
  getObj: (val: string) => Promise<any>;
  setObj: (tableName: string, obj: object) => Promise<object>;
  addKey: (tableName: string, key: string) => Promise<object>;
  delKey: (tableName: string, key: string) => Promise<object>;
  delTable: (tableName: string) => Promise<object>;
}

interface result {
  get: (val: string) => any;
}
