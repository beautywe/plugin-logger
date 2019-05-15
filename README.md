# Intro
Logger plugin for BeautyWe.

[![CircleCI](https://img.shields.io/circleci/project/github/beautywe/plugin-logger/master.svg)](https://circleci.com/gh/beautywe/plugin-logger)
[![NPM Version](https://img.shields.io/npm/v/@beautywe/plugin-logger.svg)](https://www.npmjs.com/package/@beautywe/plugin-logger) 
[![NPM Downloads](https://img.shields.io/npm/dm/@beautywe/plugin-logger.svg)](https://www.npmjs.com/package/@beautywe/plugin-logger) 
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@beautywe/plugin-logger.svg)
[![Coverage Status](https://coveralls.io/repos/github/beautywe/plugin-logger/badge.svg)](https://coveralls.io/github/beautywe/plugin-logger)


## Feature
1. 可控制的 log level
2. 自定义前缀
3. 轻量，简单

## 适用性

适用 `BeautyWe.BtPage`, `BeautyWe.BtApp`

# 安装

```
$ npm i @beautywe/plugin-logger
```

```javascript
import BeautyWe from '@beautywe/core';
import logger from '@beautywe/plugin-logger';

const page = new BeautyWe.BtPage();

page.use(logger({
    // options
}));
```

# 使用

## API

```javascript
page.logger.info('this is info');
page.logger.warn('this is warn');
page.logger.error('this is error');
page.logger.debug('this is debug');

// 输出
// [info] this is info
// [warn] this is warn
// [error] this is error
// [debug] this is debug
```

## Level control

可通过配置来控制哪些 level 该打印：

```javascript
page.use(logger({
    level: 'warn',
}));
```

那么 `warn` 以上的 log （`info`, `debug`）就不会被打印，这种满足于开发和生成环境对 log 的不同需求。

level 等级如下：

```javascript
Logger.LEVEL = {
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
};
```

## Prefix

```javascript
page.use(logger({
    prefix: 'beautywe',
}));

page.logger.info('this is info');

// 输出
// [beautywe:info] this is info
```

## Custom title

```javascript
page.logger.info('this is info');

// 输出
// [info] this is info
```

其中 `[info]` 部分，被称为 title，这部分允许自定义的：

```javascript
page.use(logger({
    titleTemplate({ prefix, levelName }) {
        return prefix ? `[${prefix}:${levelName}]` : `[${levelName}]`;
    }
}));
```

## Handler

支持监听各种 log，以支持诸如：「错误日志，需要上报」这种需求：

```javascript
page.use(logger({
    onError(...args) {
        // do your logic
    },
    onWarn(...args) {
        // do your logic
    },
    onInfo(...args) {
        // do your logic
    },
    onDebug(...args) {
        // do your logic
    },
}));
```

# License
This project is licensed under the [MIT license](LICENSE).

Copyright (c) JerryC Huang (huangjerryc@gmail.com)