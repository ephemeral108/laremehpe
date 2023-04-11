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
  createObj(val) {
    const todo = new AV.Object("dictionary");

    todo.set("list", val);
    todo.set("date", new Date().valueOf());

    todo.save().then(
      (todo) => {
        console.log(`id:${todo.id}`);
        navigator.clipboard.writeText(todo.id);
      },
      (error) => {
        console.log(error, "err");
      }
    );
  }

  copy() {
    const query = new AV.Query("dictionary");
    return query.get("6410707f9c3cf57aeaee7e1f");
  }

  paste(val) {
    const todo = AV.Object.createWithoutData(
      "dictionary",
      "6410707f9c3cf57aeaee7e1f"
    );
    todo.set("word", val);
    todo.save();
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
