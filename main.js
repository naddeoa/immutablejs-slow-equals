const Immutable = require("immutable");

const iterations = 1000;
const size = 100000;

function createList() {
  let list = [];
  for (let i = 0; i < size; i++) {
    list[i] = i + 1;
  }
  return list;
}

function createImmutableList() {
  return Immutable.List(createList());
}

function compare(l1, l2) {
  for (let i = 0; i < l1.length; i++) {
    if (l1[i] !== l2[i]) {
      return false;
    }
  }
  return true;
}

function compareImmutable(l1, l2) {
  return Immutable.is(l1, l2);
}

function compareMany(l1, l2) {
  let result = false;

  for (let i = 0; i < iterations; i++) {
    result = compare(l1, l2);
  }
  return result;
}

// TODO why isn't this instant?
function compareImmutableMany(l1, l2) {
  let result = false;
  for (let i = 0; i < iterations; i++) {
    result = l1.equals(l2);
  }
  return result;
}

function timeit(fn) {
  console.log("starting");
  let now = new Date();
  fn();
  let done = new Date();
  console.log("Seconds:" ,(done.getTime() - now.getTime()) / 1000);
}

function main() {
  timeit(() => {
    i1 = createImmutableList();
    i2 = createImmutableList();
    console.log("immutable lists are equal", compareImmutableMany(i1, i2));
  });

  timeit(() => {
    l1 = createList();
    l2 = createList();
    console.log("normal lists are equal:", compareMany(l1, l2));
  });
}

main();
