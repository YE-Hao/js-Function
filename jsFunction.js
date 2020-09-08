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
function IPromise (excutor) {
  var _this = this;
  _this.status = 'pendding';
  _this.value = null;
  _this.resolveList = [];
  _this.rejectedList = [];
  try {
    excutor(resolve, rejected);
  } catch (e) {
    rejected(e)
  }
  function resolve(value) {
    console.log('resolve',value)
    if (_this.status === 'pendding') {
      _this.status = 'fulfilled';
      _this.value = value;
      _this.resolveList.forEach((item) => {
        item(_this.value);
        _this.resolveList.shift();
      });
    }
  }
  function rejected(value) {
    if (_this.status === 'pendding') {
      _this.status = 'rejected';
      _this.value = value;
      _this.rejectedList.forEach((item) => {
        item(_this.value);
        _this.rejectedList.shift();
      });
    }
  }
}
IPromise.prototype.then = function(res, rej) {
  var _this = this;
  if (_this.status === 'fulfilled') {
    return new IPromise((resolve, rejected) => {
      const result = res(_this.value); // 执行then的回调函数
      if (result instanceof IPromise) {
        result.then(resolve, rejected)
      } else {
        resolve(result);
      }
    });
  }
  if (_this.status === 'rejected') {
    return new IPromise((resolve, rejected) => {
      const result = rejected(_this.value);
      if (result instanceof IPromise) {
        result.then(resolve, rejected);
      } else {
        rejected(this.value);
      }
    });
  }
  if (_this.status === 'pendding') {
    return new IPromise((resolve, rejected) => {
      _this.resolveList.push(() => {
        var result = res(_this.value);
        if (result instanceof IPromise) {
          result.then(resolve, rejected);
        } else {
          resolve(_this.value);
        }
      });
      _this.rejectedList.push(() => {
        var result = rej(_this.value);
        if (result instanceof IPromise) {
          result.then(resolve, rejected);
        } else {
          rejected(_this.value)
        }
      })
    });
  }
}

