// promise实现
const midPromise1 = (req, res, next) => {
  console.log('midPromise1 start');
  // new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log('async1 script');
  //     resolve(1);
  //   }, 1000);
  // }).then((result) => {
  //   next();
  // });
  return next().then((r) => {
    console.log('r1end', r);
    return '1';
  });
}
const midPromise2 = (req, res, next) => {
  console.log('midPromise2 start');
  // new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log('async2 script ');
  //     resolve(2);
  //   }, 2000);
  // }).then((result) => {
  //   next();
  // });
  return next().then((r) => {
    console.log('r2end', r);
    return 2
  });
}
const midPromise3 = (req, res, next) => {
  console.log('midPromise3 start');
  // new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     console.log('async2 script ');
  //     resolve(2);
  //   }, 2000);
  // }).then((result) => {
  //   next();
  // });
  return next().then((r) => {
    console.log('r3end', r);
    return 3
  });
}
// 基本
const mid1 = async (req, res, next) => {
  await console.log('mid1');
  next();
}
const mid2 = async (req, res, next) => {
  await console.log('mid2');
  // setTimeout(() => {
  //   console.log('mid2');
  // },1000);
  next();
}
const mid3 = async (req, res, next) => {
  await console.log('mid3');
  next();
};

// async await
const midAsync1 = async (req, res, next) => { // 这里的参数可以是netOption
  console.log('start1'); // 修改request
  const result = await next(); // 执行request
  console.log('r1', result); // 修改response
  return 'midSync1end';
}
const midAsync2 = async (req, res, next) => { // 假如这是一个请求接口
  console.log('start2');
  const result = await next();
  console.log('r2', result);
  return 'midSync1end2'
}
const midAsync3 = async (req, res, next) => {
  console.log('start3');
  const result = await next();
  console.log('r3', result);
  return 'midSync1end3'
}

// const midwares = [midPromise1, midPromise2, midPromise3];
const midwares = [midAsync1, midAsync2, midAsync3];
const run = (req, res) => {
  const next = () => {
    const midware = midwares.shift();
    if (midware) {
      return Promise.resolve(midware(req, res, next));
    } else {
      return Promise.resolve('结束');
    }
  }
  next();
}
run();
