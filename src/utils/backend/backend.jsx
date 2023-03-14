export class backend {
  constructor() {
    AV.init({
      appId: "7eRpMpAqizLN2Yd9lfV0rFPn-gzGzoHsz",
      appKey: "TPbgOHUW1KebCnAQrvPwpWzx",
      serverURL: "https://7erpmpaq.lc-cn-n1-shared.com",
    });
    return this;
  }

  add(val) {
    const todo = new AV.Object("dictionary");

    todo.set("word", val);
    todo.set("date", new Date().valueOf());

    todo.save().then(
      (todo) => {
        console.log(`保存成功。objectId：${todo.id}`);
      },
      (error) => {
        console.log(error, "err");
      }
    );
  }

  async copy() {
    return new Promise((resolve) => {
      const query = new AV.Query("dictionary");
      query.get("6410707f9c3cf57aeaee7e1f").then((res) => {
        resolve(res.get("word"));
      });
    });
  }

  paste(val) {
    const todo = AV.Object.createWithoutData(
      "dictionary",
      "6410707f9c3cf57aeaee7e1f"
    );
    todo.set("word", val);
    todo.save();
  }
}
