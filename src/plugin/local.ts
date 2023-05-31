const locals = [
  {
    key: "",
    value: false,
  },
];

export class Local {
  localKey = "71395d3023b7d03199cc79a2f9ca8afa";
  locals;

  constructor(locals = []) {
    this.locals = locals;
    const obj = this.get();
    this.locals.forEach(({ key, value }) => {
      obj[key] = value;
    });
    this.set(obj);
  }

  /**
   * 保存数据到本地储存
   * @param {*} data
   * @returns
   */
  set(data: any) {
    return window.localStorage.setItem(this.localKey, JSON.stringify(data));
  }

  /**
   * 从本地储存获取数据
   * @returns
   */
  get() {
    const obj = window.localStorage.getItem(this.localKey);
    return obj ? JSON.parse(obj) : {};
  }
}

export function localProxy() {
  return new Proxy(new Local(), {
    get: (target, propKey, receiver) => {
      return target.get()[propKey];
    },
    set: (target, propKey, value, receiver) => {
      const obj = target.get();
      obj[propKey] = value;
      target.set(obj);
      return Reflect.set(target, propKey, value, receiver);
    },
  });
}
