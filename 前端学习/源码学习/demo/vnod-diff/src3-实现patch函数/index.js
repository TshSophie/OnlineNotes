import h from "./h";
import patch from "./patch";

let container = document.getElementById("container");
let btn = document.getElementById("btn");

// const myVnode1 = h("ul", {}, "你好1");

const myVnode1 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
]);
const myVnode2 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);

const myVnode3 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
]);
const myVnode4 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "D"),
  h("li", {}, "B"),
  h("li", {}, "C"),
]);

const myVnode5 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
]);
const myVnode6 = h("ul", {}, [
  h("li", {}, "A"),
  h("li", {}, "B"),
  h("li", {}, "C"),
  h("li", {}, "D"),
]);


// const myVnode2 = h("ul", {}, "你好2");

// 上树
patch(container, myVnode1);
patch(myVnode1, myVnode2);
