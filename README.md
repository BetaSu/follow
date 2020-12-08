## 说明

大佬时间线订阅——前端

## 技术栈

框架： 开启`Concurrent Mode`的实验版本[React](https://zh-hans.reactjs.org/docs/concurrent-mode-intro.html)

状态管理：[unstated-next](https://github.com/jamiebuilds/unstated-next)

数据请求：[SWR](https://swr.vercel.app/)

## VSCode 插件依赖

`tslint`用于`JS`代码检查

`stylelint`用于`less`代码检查

`prettier`用于格式化

```js
// 参考vscode配置
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "editor.codeActionsOnSave": {
    "source.fixAll.tslint": true
  },
  "editor.formatOnSave": true,
  "prettier.stylelintIntegration": true
}
```

## tip

报错：

```js
Cannot use JSX unless the '--jsx' flag is provided.ts(17004)
```

原因是`VSCode`使用了老版本`TS`，右下角将 TS 的版本切换为项目所使用的`TS`版本（4.1.2）。
