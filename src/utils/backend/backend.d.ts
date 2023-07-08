// This file contains the backend class and related interfaces
export declare class backend {
  constructor(): backend;
  static instance: myBack;
  static getInstance: () => myBack;
}

interface myBack {
  fetchPlaceholders: () => Promise<result>;
  setPlaceholders: (val: Array<{ key: string; url: string }>) => void;
  fetchMemo: () => Promise<{ get: (val: string) => Array<memoItem> }>;
  updateMemo: (val: Array<memoItem>) => void;
  copy: () => Promise<object>;
  paste: (val: string) => void;
}

interface result {
  get: (val: string) => any;
}
