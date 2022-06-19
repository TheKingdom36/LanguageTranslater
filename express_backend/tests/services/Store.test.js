const Store = require("../../api/services/Store")

var store 

beforeEach(() => {
  store = new Store();
});

describe("Test adding values to Store", () => {
  test("add valid value to store should succeed ", (done) => {
    store.add("Value");

    expect(store.getAll()).toStrictEqual(["Value"]);
    done();
  });

  test("add invalid value to the store", (done) => {
    store.add(undefined);
    store.add(null);
    expect(store.getAll()).toStrictEqual([]);
    done();
  });

  test("add multiple values", (done) => {
    store.add("Value1", "Value2", "Value3");

    expect(store.getAll()).toStrictEqual(["Value1", "Value2", "Value3"]);
    done();
  });
});

describe("Test finding values from Store", () => {
  test("find value from store", (done) => {
    store.add("Value");
    var response = store.find((value) => value === "Value");

    expect(response).toStrictEqual(["Value"]);
    done();
  });

  test("find more complex object from store", (done) => {
    store.add({ top: { mid: { bot: "value" } } });

    var response = store.find((value) => value.top.mid.bot === "value");
    expect(response).toStrictEqual([{ top: { mid: { bot: "value" } } }]);
    done();
  });
});

describe("Test removing values from Store", () => {
  test("delete value from store", (done) => {
    store.add("Value");
    store.delete((value) => value === "Value");

    expect(store.getAll()).toStrictEqual([]);
    done();
  });

  test("attmept delete value not in store", (done) => {
    store.add("value");
    store.delete((value) => value === "value1");
    expect(store.getAll()).toStrictEqual(["value"]);
    done();
  });

  test("delete more complex object from store", (done) => {
    store.add({ top: { mid: { bot: "value" } } });

    store.delete((value) => value.top.mid.bot === "value");
    expect(store.getAll()).toStrictEqual([]);
    done();
  });
});
