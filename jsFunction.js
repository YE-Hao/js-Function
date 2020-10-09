// 实现map
Array.prototype.Map = function(fn,context){
  if(typeof fn !== 'function' || typeof this !== 'object' || !this.length) {
    return [];
  }
  const arr = [];
  for(let i = 0; i < this.length; i ++) {
    const res = fn.call(context, this[i], i, this);
    arr.push(res);
  }
  return arr;
};
// 实现forEach
Array.prototype.ForEach = function(fn,context) {
  if(typeof fn !== 'function' || typeof this !== 'object' || !this.length) {
    return;
  }
  for(let i = 0; i < this.length; i ++) {
    fn.call(context, this[i], i, this);
  }
};
// 实现filter
Array.prototype.Filter = function(fn, context) {
  const arr = [];
  if (typeof fn === 'function') {
    for(let i = 0; i < this.length; i++) {
      const res = fn.call(context, this[i], i, this);
      if (res) {
        arr.push(this[i]);
      }
    }
  }
  return arr;
}
// 实现 some
Array.prototype.Some = function(fn, context) {
  let result; 
  for (let i = 0; i < this.length; i++) {
    result = fn.call(context, this[i], i, this);
    if (result) {
      break;
    }
  }
  return !!result;
}
// 实现every
Array.prototype.Every = function (fn, context) {
  let result; 
  for (let i = 0; i < this.length; i++) {
    result = fn.call(context, this[i], i, this);
    if (!result) {
      break;
    }
  }
  return !!result;
}
// 实现find
Array.prototype.Find = function(fn,context) {
  let result;
  for(let i = 0; i < this.length; i++) {
    result = fn.call(context, this[i], i, this);
    if (result) {
      break;
    }
  };
  return result;
}
// 实现findIndex
Array.prototype.FindIndex = function(fn,context) {
  let index = -1;
  for(let i = 0; i < this.length; i++) {
    result = fn.call(context, this[i], i, this);
    if (result) {
      index = i;
      break;
    }
  };
  return index;
}
// 实现concat
Array.prototype.Concat = function(){
  const arr = [...this];
  console.log('asd')
  for(let i = 0; i < arguments.length; i++) {
    if (typeof arguments[i] === 'object') {
      for(let j = 0; j < arguments[i].length; j++){
        arr.push(arguments[i][j]);
      }
    } else {
      arr.push(arguments[i]);
    }
  }
  return [...arr];
}
// 实现reduce
Array.prototype.Reduce = function(fn, initValue) {
  if(typeof fn !== 'function') {
    new ReferenceError('fn is needed ');
    return;
  }
  if (!this.length && !initValue) {
    new ReferenceError('initvalue should be provided');
  }
  if (!this.length && initValue) {
    return initValue;
  }
  let result = initValue || this[0];
  const startIndex = initValue ? 0 : 1;
  for(let i = startIndex; i < this.length; i ++) {
    result = fn(result, this[i], i, this);
  }
  return result;
};
// 实现reduceRight
Array.prototype.ReduceRight = function(fn, initValue) {
  if(typeof fn !== 'function') {
    new ReferenceError('fn is needed ');
    return;
  }
  if (!this.length && !initValue) {
    new ReferenceError('initvalue should be provided');
  }
  if (!this.length && initValue) {
    return initValue;
  }
  let result = initValue || this[this.length -1];
  const startIndex = initValue ? this.length - 1 : this.length - 2;
  for(let i = startIndex; i >= 0; i --) {
    result = fn(result, this[i], i, this);
  }
  return result;
}
// 实现reverce
Array.prototype.Reverse = function(){
  for (let i = 0; i < this.length - i - 1; i++) {
    const temp = this[i];
    this[i] = this[this.length - 1 - i];
    this[this.length - 1 - i] = temp;
  }
  return this;
}
// 实现sort
Array.prototype.SortByBubble = function(fn) {
  const len = this.length;
  if (!fn){
    for(let i = 0; i < len - 1; i++) { // 冒泡次数（本质是依次找出最大值）
      for(let j = 0; j < len - 1 - i; j++) {
        if (this[j] > this[j + 1]) {
          const temp = this[j];
          this[j] = this[j+1];
          this[j+1] = temp;
        }
      }
    }
    return this;
  }
  for(let i = 0; i < len - 1; i++) { // 冒泡次数
    for(let j = 0; j < len - 1 - i; j++) {
      const res = fn(this[j + 1], this[j]);
      if (res < 0) {
        const temp = this[j];
        this[j] = this[j+1];
        this[j+1] = temp;
      }
    }
  }
  return this;
}
// 选择排序实现sort
Array.prototype.SortBySort = function(fn) {
  const len = this.length;
  let temp,minIndex;
  if (!fn){
    for(let i = 0; i < len - 1; i++) { // 选择排序
      minIndex = i
      for(let j = i + 1; j < len; j++) {
        if (this[j] < this[minIndex]) {
            minIndex = j;
        }
      }
      temp = this[i];
      this[i] = this[minIndex];
      this[minIndex] = temp;
    }
    return this;
  }
  for(let i = 0; i < len - 1; i++) { // 选择排序
    minIndex = i
    for(let j = i + 1; j < len; j++) {
      const res = fn(this[j], this[minIndex]);
      if (res < 0) {
          minIndex = j;
      }
    }
    temp = this[i];
    this[i] = this[minIndex];
    this[minIndex] = temp;
  }
  return this;
}
// 实现join
Array.prototype.Join = function(s) {
  s = s === null || s === undefined ? '' : ',';
  let str = '';
  for(let i = 0; i < this.length; i++) {
    str += `${this[i] || ''}${s}`;
  }
  return str.substring(0,str.length - 1);
}
// 实现slice
Array.prototype.Slice = function(start, end){
  start = start || 0;
  end = end && end <= this.length ? end : this.length;
  const arr = [];
  for(let i = start; i < end; i ++) {
    arr.push(this[i]);
  }
  return arr;
}
// 实现splice
Array.prototype.Splice = function() {
  if(arguments.length === 0 || arguments[0] > this.length) {
    return [];
  }
  let index = +arguments[0];
  let count = +arguments[1];
  index = Number.isNaN(index) ? 0 : index;
  count = Number.isNaN(count) ? this.length - index : (count > (this.length - index)) ? (this.length - index) : count;
  let arr = [];
  let start = index;
    // 返回元素储存
    for(let i = 0; i < count; i++){
      arr.push(this[start]);
      start++;
    }
    let start_two = index;
    // 修改原来数组
    for(let k = 0; k < this.length - count - index; k++) {
      this[start_two] = this[start_two + count];
      start_two++;
    }
  if (arguments.length < 3) {
    this.length = this.length - count;
    return arr;
  } else {
    const insertArr = [];
    for(let o = 2; o < arguments.length; o++) {
      insertArr.push(arguments[o]);
    }
    this.length = this.length - count + insertArr.length; // 扩容
     // 再修改原来数组index后的元素移动insertArr.length位置
     for(let h = this.length - 1; h > index; h--) {
      this[h] = this[h - insertArr.length];
    }
    // 再将中间的补齐
    for (let j = 0; j < insertArr.length; j++) {
      this[j + index] = insertArr[j];
    }
    return arr;
  }
}
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
/***==========实现js通用一些方法********/
function myNew (fn) {
  var obj = {};
  if(fn.prototype !== null) {
    obj.__proto__ = fn.prototype;
  }
  var ret = fn.apply(obj, Array.prototype.slice.call(arguments,1));
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret;
  }
  return obj;
}
// 实现instanceof
function myInstanceof(x,y) {
  if(typeof x !== 'object' || typeof y !== 'function') {
    throw new TypeError('x,y illeagle');
  }
  while(x.__proto__) {
    if(x.__proto__ === y.prototype) {
      return true;
    }
    x = x.__proto__;
  }
  return false;
}
// 实现call
Function.prototype.Call = function(context) {
  var obj = context || window;
  const args = [];
  for(let i = 1; i < arguments.length; i ++){
    args.push(arguments[i]);
  }
  obj[Symbol.for('fn')] = this;
  obj[Symbol.for('fn')](...args);
  delete obj[Symbol.for('fn')];
}
// 实现apply
Function.prototype.Apply = function(context, arr) {
  var obj = context || window;
  if (!Array.isArray(arr)) {
    return new Error('error');
  }
  obj[Symbol.for('fn')] = this;
  obj[Symbol.for('fn')](...arr);
  delete obj[Symbol.for('fn')];
}
// 实现bind(原理就是函数柯里化)
Function.prototype.Bind = function (context) {
  var obj = context || window;
  const args = Array.prototype.slice.call(arguments, 1);
  return function () {
    obj[Symbol.for('fn')] = this;
    obj[Symbol.for('fn')](...args);
    delete obj[Symbol.for('fn')];
  }
}
// proxy
var obj = new Proxy({}, {
  get(target, propKey, receiver){
    console.log('target', target);
    console.log('propKey', propKey);
    console.log('receiver', receiver);
    return Reflect.get(target, propKey, receiver);
  },
  set(target, propKey, value, receiver){
    console.log('target', target);
    console.log('propKey', propKey);
    console.log('receiver', receiver);
    console.log('value', value);
    return Reflect.set(target, propKey, value, receiver);
  }
});
// 用es6实现一个观察者模式
const observerList = new Set();
const ob = fn => observerList.add(fn);
const observers = obj => new Proxy(obj,{
  set(target, propKey, value, receiver) {
    observerList.forEach(observer => observer());
    return Reflect.set(target, propKey, value, receiver);
  }
});
// 实现promise
function DoPromise(excutor) {
  const _this = this;
  this.status = 'PENDDING';
  this.value = null;
  this.reason = null;
  this.rejectedList = [];
  this.resolveList = [];
  function resolve(value) {
    if(_this.status === 'PENDDING') {
      _this.status = 'FULFILLED';
      _this.value = value;
      _this.resolveList.forEach(fn => fn());
    }
  };
  function rejected(reason) {
    if(_this.status === 'PENDDING') {
      _this.status = 'REJECTED';
      _this.reason = reason;
      _this.rejectedList.forEach(fn => fn())
    }
  }
  try {
    excutor(resolve, rejected);
  } catch(e) {
    rejected(e)
  }
}
function resolvePromise(promise, x, resolve, rejected) {
  if(promise === x) {
    rejected(new TypeError('Chaining cycle'));
  }
  let used;
  if((x !== null && typeof x === 'object') || (typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          if (used) return;
          used = true;
          resolvePromise(promise, y, resolve, rejected);
        }, (err) => {
          if (used) return;
          used = true;
          rejected(err);
        });
      } else {
        if (used) return;
        used = true;
        resolve(x);
      }
    } catch(e) {
      rejected(e)
    }
  } else {
    resolve(x);
  }
}
DoPromise.prototype.then = function(resolveCB, rejectedCB) {
  var _this = this;
  resolveCB = typeof resolveCB === 'function' ? resolveCB : v => v;
  rejectedCB = typeof rejectedCB === 'function' ? rejectedCB : reason => { throw reason };
  var promise2 = new DoPromise((resolve, rejected) => {
    if(_this.status === 'FULFILLED') {
      setTimeout(() => {
        try {
          let x = resolveCB(_this.value);
          resolvePromise(promise2, x, resolve, rejected);
        } catch(e) {
          rejected(e);
        }
      },0);
    }
    if(_this.status === 'REJECTED') {
      setTimeout(() => {
        try {
          let x = rejectedCB(_this.reason);
          resolvePromise(promise2, x, resolve, rejected);
        } catch(e) {
          rejected(e)
        }
      },0);
    }
    if(_this.status === 'PENDDING') {
      _this.resolveList.push(() => {
        setTimeout(() => {
          try {
            let x = resolveCB(_this.value);
            resolvePromise(promise2, x, resolve, rejected);
          } catch(e) {
            rejected(e);
          }
        },0);
      });
      _this.rejectedList.push(() => {
        setTimeout(() => {
          try {
            let x = rejectedCB(_this.reason);
            resolvePromise(promise2, x, resolve, rejected);
          } catch(e) {
            rejected(e);
          }
        },0);
      });
    }
  });
  return promise2;
  // if(this.status === 'FULFILLED') {
  //   typeof resolveCB === 'function' && resolveCB(this.value);
  // }
  // if(this.status === 'REJECTED') {
  //   typeof rejectedCB === 'function' && rejectedCB(this.reason)
  // }
  // if(this.status === 'PENDDING') {
  //   typeof resolveCB === 'function' && this.resolveList.push(resolveCB);
  //   typeof rejectedCB === 'function' && this.rejectedList.push(rejectedCB);
  // }
}
DoPromise.resolve = function(value) {
  const p = new DoPromise((resolve, rejected) => {
    resolvePromise(p, value, resolve, rejected);
  });
  return p;
}
DoPromise.reject = function(value) {
  return new DoPromise((resolve, rejected) => {
    rejected(value);
  });
}
DoPromise.prototype.catch = function(cb) {
  return this.then(null,cb);
}
DoPromise.prototype.finally = function(cb) {
  return this.then(value =>{
    return DoPromise.resolve(cb()).then(() => value);
  }, reason => {
    return DoPromise.resolve(cb()).then(() => { throw reason });
  })
}
DoPromise.all = function(arrs) {
  if(arrs instanceof Array) {
    return new DoPromise((resolve, rejected) => {
      let resultList = [];
      let index = 0;
      const resultByKey = (value, i) => {
        resultList[i] = value;
        if(++index === arrs.length) {
          resolve(resultList);
        }
      }
      for(let j = 0; j < arrs.length; j ++) {
        let each = arrs[j];
        if (each && typeof each.then === 'function') {
          each.then(r => {
            resultByKey(r, j);
          }, rejected);
        } else {
          resultByKey(each, j);
        }
      }
    });
  } else {
    throw new TypeError(`${arr} is not Iterable!`);
  }
}
DoPromise.race = function (arr) {
  return new DoPromise((resolve, rejected) => {
    if(arr.length === 0) {
      return;
    }
    for(let i = 0; i < arr.length; i ++) {
      DoPromise.resolve(arr[i]).then(res => resolve(res), err => rejected(err))
    }
  });
}
// 递归深copy
function deepCopy(target) {
  // var copyObj = {};
  const _deepCopy = (target, hash = new WeakMap()) => {
    if (hash.has(target)) { // 解决循环引用的问题
      return hash.get(target);
    }
    var copyObj = Array.isArray(target) ? [] : {};
    hash.set(target, copyObj);
    for(let key in target) {
      const type = Object.prototype.toString.call(target[key]);
      switch(type){
        case '[object RegExp]':
        case '[object Date]':
        case '[object Function]':
        case '[object Null]':
          copyObj[key] = target[key];
          break;
        default:
          copyObj[key] = typeof target[key] === 'object' ? _deepCopy(target[key], hash) : target[key];
          break;
      }
    }
    return copyObj;
  }
  return _deepCopy(target);
}
// 函数柯里化
function checkout(str, reg) {
  return reg.test(str);
}
function currying(fn) {
  return function(reg){
    return function(str){
      return fn.call(this, str, reg);
    }
  }
}
// 柯里化通用
function createCurrying(fn) {
  const fnArgs = fn.length;
  const args = Array.prototype.slice.call(arguments,1);
  return function () {
    var _args = [].slice.call(arguments); // 接受后续的参数
    var finalArgs = [...args,..._args];
    if (fnArgs > finalArgs.length) {
      return createCurrying.call(this, fn, ...finalArgs);
    }
    return fn.apply(this, finalArgs);
  }
}
function currying(fn) {
  const fnArgs = fn.length;
  var args = [].slice.call(arguments,1);
  console.log(arguments);
  console.log(args);
  var _currying = function() {
    var _args = [].slice.call(arguments);
    var finalArgs = [...args, ..._args];
    if (fnArgs > finalArgs.length) {
      return currying.call(this, fn, ...finalArgs);
    }
    return fn.apply(this, finalArgs);
  }
  return _currying;
}
// 无限参数
function add() {
  var args = [].slice.call(arguments);
  var adder = function() {
    var _adder = function() {
      args.push(...arguments);
      return _adder;
    }

    // 重写tostring函数
    _adder.toString = function() {
      return args.reduce((a, b) => a + b);
    }
    return _adder;
  }
  return adder(...args);
}
// 自己实现
function myAdd() {
  var args = [].slice.call(arguments);
  var add = function() {
    var _add = function(){
      args.push(...arguments);
      console.log(999);
      return _add;
    }
    _add.toString = function(){
      return args.reduce((a, b) => a + b);
    }
    return _add;
  }
  return add(...args);
}
// 防抖
const debounce = (fn, param, delay) => {
  if (fn.timerId) {
    clearTimeout(fn.timerId);
  }
  fn.timerId = setTimeout(() => {
    fn.call(this, param);
  }, delay);
}
// function swap(array) {
//   var target = array;
//   var arr = [...target];
//   var result = [];
//   console.log(13)
//   for(let i = 0; i < arr.length; i++) {
//     const a = arr.splice(i,1);
//     for (let j = 0; j <= arr.length; j++) {
//       arr.splice(j,0,a[0])
//       result.push(arr.join(''));
//       arr.splice(j,1);
//     }
//     arr = [...target];
//   }
//   return result;
// }
// function getResult(str) {
//   var targetArr = str.split('');
//   var reverseStr = [...targetArr].reverse();
//   var result = [...swap(targetArr), ...swap(reverseStr)];
//   console.log(result);
//   return [...new Set(result)];
// }
// function swap(arr,i,j) {  
//   if(i != j) {
//       var temp = arr[i];  
//       arr[i] = arr[j];  
//       arr[j] = temp;  
//   }  
// }
// js 全排列
function perm(str) {
  var result = [];
  if(str.length > 1) {
    for (let i = 0; i < str.length; i ++) {
      let current = str[i];
      let rest = str.slice(0, i) + str.slice(i + 1);
      let restEle = perm(rest);
      // 把得到的结果进行拼装
      for (let j = 0; j < restEle.length; j ++) {
        result.push(`${current}${restEle[j]}`);
      }
    }
    // 进行全排列
  } if(str.length === 1) {
    result.push(str);
  }
  return result;
}
class Node {
  constructor(element){
    this.element = element;
    this.next = null;
  }

}
// 链表(单向)
class LinkedList {
  constructor() {
    this.head = new Node('head');
  }
  find(item) {
    let current = this.head;
    while(current.element !== item) {
      current = current.next;
    }
    return current;
  }
  insert(item, target) {
    const targetEle = this.find(target);
    const newElement = new Node(item);
    newElement.next = targetEle.next;
    targetEle.next = newElement;
  }
  remove(item) {
    const preTarget = this.findPrevious(item);
    if (preTarget.next !== null) {
      preTarget.next = preTarget.next.next;
    }
  }
  findPrevious(item) {
    let current = this.head;
    while(current.next && current.next.element !== item) {
      current = current.next;
    }
    return current;
  }
  display() {
    let current = this.head;
    while(current.next !== null) {
      console.log(current.next.element);
      current = current.next;
    }
  }
  reverse() {
    let current = this.head;
    let n2 = current.next;
    let n3 = null;
    if (current === null || current.next === null) {
      return current;
    }
    while(n2) {
      n3 = n2.next; // 保存没引用的节点
      n2.next = current; // 反转
      current = n2; // 移动
      n2 = n3;
    }
    this.head.next = null;
    this.head = current;
    return this.head;
  }
}
class DNode {
  constructor(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
  }
}
// 双向链表
class DLinkedList {
  constructor() {
    this.head = new DNode('head');
    this.head.next = this.head; // 链表有环
  }
  find(item) {
    let current = this.head;
    while(current.element !== item) {
      current = current.next;
    }
    return current;
  }
  insert(item,target) {
    const targetEle = this.find(target);
    const itemNode = new DNode(item);
    itemNode.next = targetEle.next;
    targetEle.next = itemNode;
    itemNode.previous = targetEle;
  }
  remove(item) {
    const itemTarget = this.find(item);
    if (itemTarget.next) {
      itemTarget.previous.next = itemTarget.next;
      itemTarget.next.previous = itemTarget.previous;
    } else {
      itemTarget.previous.next = null;
      itemTarget.previous = null;
    }
  }
  displayAll() {
    let current = this.head;
    while(current.next !== null && current.next.element !== 'head') {
      console.log(current.next.element);
      current = current.next;
    }
  }
  findLast() {
    let current = this.head;
    while(current.next !== null && current.next.element !== 'head'){
      current = current.next;
    }
    return current;
  }
  displayReverse() {
    let current = this.findLast();
    while(current.previous !== null) {
      console.log(current.element);
      current = current.previous;
    }
  }
  // 反转链表
  reverse() {
    let current = this.head;
    while(current.next) {
      let temp = current.next
      current.next.next = current;
      current = temp;
    }
  }
}
  // 判断链表是否有环
  function isCycle(head) {
    let a = head;
    let b = head;
    while(a.next && b.next && b.next.next){
      if (a.next.element === b.next.next.element) {
        return true;
      }
      a = a.next;
      b = b.next.next;
    }
    return false
  }
  // 二叉树
  class TreeNode{
    constructor(data, left, right){
      this.data = data;
      this.left = left;
      this.right = right;
    }
    show() {
      return this.data;
    }
  }
  class BST {
    constructor() {
      this.root = null;
    }
    insert(data) {
      const node = new TreeNode(data, null, null);
      if (this.root === null) {
        this.root = node;
      } else {
        let current = this.root;
        while(true) {
          if (data < current.data) {
            if (current.left === null) {
              current.left = node;
              break;
            } else {
              current = current.left;
            }
          }
          if (data > current.data) {
            if (current.right === null) {
              current.right = node;
              break;
            } else {
              current = current.right;
            }
          }
        }
      }
    }
    findMax() {
      let current = this.root;
      while(current.right !== null) {
        current = current.right;
      }
      return current.data;
    }
    findMin() {
      let current = this.root;
      while(current.left !== null) {
        current = current.left;
      }
      return current.data;
    }
  }
   // 给定值输出路径
   var showPathByTarget1 = (target, treeNode) => {
    let path = [];
    let result = [];
    // console.log(path);
    var _loops = (target, treeNode) => {
      if (treeNode !== null) {
        path.push(treeNode.data);
        target -= treeNode.data;
        if (target === 0 && (!treeNode.left || !treeNode.right)) {
          result.push([...path]);
        }
        if (!treeNode.left) {
          target += treeNode.data;
        }
        _loops(target, treeNode.left);
        _loops(target, treeNode.right);
        path.splice(path.length - 1);

      }
      return result;
    }
    return _loops(target, treeNode);
  }
  // 二叉树先序遍历
  const firstLoop = (treeNode) => {
    if(treeNode !== null) {
      console.log(treeNode.data);
      firstLoop(treeNode.left);
      firstLoop(treeNode.right);
    }
  }
  // 二叉树中序遍历
  const midLoop = (treeNode) => {
    if (treeNode !== null) {
      midLoop(treeNode.left);
      console.log(treeNode.data);
      midLoop(treeNode.right);
    }
  }
   // 二叉树后序遍历
   const lastLoop = (treeNode) => {
    if (treeNode !== null) {
      lastLoop(treeNode.left);
      lastLoop(treeNode.right);
      console.log(treeNode.data);
    }
  }
  
  // 树的遍历（深度优先）
  const deepFirst = (arr) => {
    var _deepFirst = (arr) => {
      for (let i = 0; i < arr.length; i ++) {
        if (arr[i].children) {
          _deepFirst(arr[i].children);
        }
        console.log(arr[i].name);
      }
    }
    return _deepFirst(arr);
  }
  // 广度优先
  const spreadFirst = (arr) => {
    var _spreadFirst = (arr) => {
      let queue = [...arr];
      while(queue.length > 0) {
        console.log(queue[0].name);
        if (queue[0].children) {
          queue.push(...queue[0].children);
        }
        queue = queue.slice(1);
      }
    }
    return _spreadFirst(arr);
  }
  var tee = {
    data: 5,
    left: {
      data: 4,
      left: {
        data: 11,
        left: {
          data: 7,
          left: null,
          right: null,
        },
        right: {
          data: 2,
          left: null,
          right: null,
        }
      },
      right: null,
    },
    right:{
      data: 8,
      left: {
        data: 13,
        left: null,
        right: null,
      },
      right: {
        data: 4,
        left: {
          data: 5,
          left: null,
          right: null,
        },
        right: {
          data: 1,
          left: null,
          right: null,
        }
      }
    }
  }
  class CreateStore {
    constructor(reducer, initState) {
      this.state = initState;
      this.reducer = reducer;
      this.listener = [];
      this.dispatch({ type: null });
    }
    dispatch (action) {
      this.state = this.reducer(this.state, action);
      // 观察者
      for(let i = 0; i < this.listener.length; i++) {
        this.listener[i] && this.listener[i]();
      }
    }
    getState () {
      return this.state;
    }
    subscribe(listener) {
      this.listener.push(listener);
    }
  }
  function createStore(reducer, initState, enhancer) {
    let currentState = initState;
    let currentReducer = reducer;
    let listener = [];
    let isDispatching = false;
    if (enhancer) {
      return enhancer(createStore)(reducer, initState);
    }
    function dispatch(action) {
      if (isDispatching) {
        throw new Error("Reducers may not dispatch actions.");
      }
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
      for(let i = 0; i < this.listener.length; i++) {
        listener[i] && this.listener[i]();
      }
    }
   var getState = function () {
      return currentState;
    }
   var subscribe = function(listener) {
      listener.push(listener);
    }
    dispatch({ type: 'INIT'});
    return {
      dispatch,
      getState,
      subscribe,
    }
  }
  // combineReducer
  function combineReducer(reducerObj) {
    var finalState = {};
    var reducer = function(state = {}, action) {
      for(var key in reducerObj) {
        finalState[key] = reducerObj[key](state[key], action);
      }
      return finalState;
    }
    return reducer;
  }
  function compose(...funs) {
    return arg => funs.reduceRight((a, b) => b(a), arg);
  }
  function applyMiddleware(...middlewares) {
    return (createStore) => (...args) => {
      const store = createStore(...args);
      let dispatch = () => {
        throw new Error(
          "Dispatching while constructing your middleware is not allowed. " +
            "Other middleware would not be applied to this dispatch."
        );
      };
      var middlewareAPI = {
        getState: store.getState(),
        dispatch: (...args) => dispatch(...args),
      }
      const chains = middlewares.map(middleWare => middleWare(middlewareAPI));
      dispatch = compose(...chains)(store.dispatch);
      return {
        ...store,
        dispatch,
      }
    }
  }
  var reducer1 = (state = 1, action) => {
    return {
      ...state
    }
  }
  var reducer2 = (state = 2, action) => {
    return {
      ...state
    }
  }

  var rfinal = combineReducer({r1: reducer1, r2: reducer2});
  var store = new CreateStore(rfinal);
  console.log(store.getState());