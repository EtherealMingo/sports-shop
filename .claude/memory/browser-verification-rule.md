---
name: 功能修改后浏览器验证
description: 修改功能后必须在浏览器中验证页面效果，确保修改正确生效
type: feedback
---

# 功能修改后浏览器验证

## 规则

每次修改前端功能后，**必须**使用 Chrome DevTools MCP（kimi-webbridge）在浏览器中验证修改效果。

## 验证流程

1. **启动 dev server**: `pnpm dev` 或 `pnpm start:dev`
2. **打开浏览器**: 访问对应页面 URL
3. **截图验证**: 使用 MCP `screenshot` 命令截图确认页面效果
4. **快照验证**: 使用 MCP `snapshot` 命令检查页面元素
5. **交互验证**: 使用 MCP `click` / `fill` 命令测试交互功能
6. **控制台检查**: 使用 MCP `evaluate` 命令检查是否有 JS 错误

## 验证清单

- [ ] 页面是否正常加载（无白屏、无404）
- [ ] UI 元素是否正确显示
- [ ] 数据是否正确展示（Mock 数据）
- [ ] 交互功能是否正常（按钮点击、表单提交）
- [ ] 是否有控制台错误（JS 报错）
- [ ] 菜单导航是否正确跳转

## 触发时机

- 修改页面组件后
- 修改路由配置后
- 修改样式后
- 修复 bug 后
- 新增功能后

## 参考命令

```bash
# 导航到页面
curl -s -X POST http://127.0.0.1:10086/command \
  -H 'Content-Type: application/json' \
  -d '{"action":"navigate","args":{"url":"http://localhost:8005/xxx","newTab":true},"session":"verify"}'

# 截图
curl -s -X POST http://127.0.0.1:10086/command \
  -H 'Content-Type: application/json' \
  -d '{"action":"screenshot","args":{"format":"png"},"session":"verify"}'

# 获取快照
curl -s -X POST http://127.0.0.1:10086/command \
  -H 'Content-Type: application/json' \
  -d '{"action":"snapshot","args":{},"session":"verify"}'

# 执行 JavaScript
curl -s -X POST http://127.0.0.1:10086/command \
  -H 'Content-Type: application/json' \
  -d '{"action":"evaluate","args":{"code":"..."},"session":"verify"}'
```

> 创建于 2026-06-14，确保功能修改后通过浏览器验证正确性
