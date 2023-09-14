export class backend {
  static instance = null;
  constructor() {
    AV.init({
      appId: "7eRpMpAqizLN2Yd9lfV0rFPn-gzGzoHsz",
      appKey: "TPbgOHUW1KebCnAQrvPwpWzx",
      serverURL: "https://7erpmpaq.lc-cn-n1-shared.com",
    });
    return this;
  }

  static getInstance() {
    if (this.instance === null) this.instance = new backend();
    return this.instance;
  }

  //构建对象
  //cloud.createObj([{ key: 1, key: 2 }]);
  // createObj(val) {
  //   const todo = new AV.Object("dictionary");

  //   todo.set("list", val);
  //   todo.set("date", new Date().valueOf());

  //   return new Promise((resolve, reject) => {
  //     todo.save().then(
  //       (todo) => {
  //         console.log(`id:${todo.id}`);
  //         navigator.clipboard.writeText(todo.id);
  //         resolve(todo.id);
  //       },
  //       (error) => {
  //         console.log(error, "err");
  //       }
  //     );
  //   });
  // }
  createObj(obj) {
    const dataBase = AV.Object.extend("miscellaneous");
    const cloudObj = new dataBase();
    for (let key in obj) {
      cloudObj.set(key, obj[key]);
    }
    return cloudObj.save();
  }

  getObj(val) {
    const query = new AV.Query("miscellaneous");
    return query.get(val);
  }

  setObj(tableName, obj) {
    const todo = AV.Object.createWithoutData("miscellaneous", tableName);
    for (let key in obj) {
      todo.set(key, obj[key]);
    }
    return todo.save();
  }

  delKey(tableName, key) {
    const todo = AV.Object.createWithoutData("miscellaneous", tableName);
    todo.unset(key);
    return todo.save();
  }

  delTable(tableName) {
    const todo = AV.Object.createWithoutData("miscellaneous", tableName);
    return todo.destroy();
  }

  async copy() {
    const query = new AV.Query("miscellaneous");
    return query.get("650264a4156a2610d0a81367");
  }

  async paste(val) {
    const todo = AV.Object.createWithoutData(
      "miscellaneous",
      "650264a4156a2610d0a81367"
    );
    todo.set("content", val);
    return todo.save();
  }

  async fetchMemo() {
    const query = new AV.Query("dictionary");
    return query.get("642c3d161abe031ff722202b");
  }

  async updateMemo(val) {
    const todo = AV.Object.createWithoutData(
      "dictionary",
      "642c3d161abe031ff722202b"
    );
    todo.set("list", val);
    todo.save();
  }

  async fetchPlaceholders() {
    const query = new AV.Query("dictionary");
    return query.get("643502153531836e685cb3a9");
  }

  async setPlaceholders(val) {
    const todo = AV.Object.createWithoutData(
      "dictionary",
      "643502153531836e685cb3a9"
    );
    todo.set("list", val);
    todo.save();
  }
}
