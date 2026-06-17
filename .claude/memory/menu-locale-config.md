---
name: 菜单国际化配置
description: Umi Max 菜单中文标签配置方法，解决菜单显示英文的问题
type: feedback
---

# 菜单国际化配置

## 问题

Umi Max 项目中，菜单分组名称显示为英文（如 member-group、service-group），即使配置了 `locale` 属性和中文语言包，子菜单项仍然显示英文。

## 原因

Umi Max 的菜单系统使用 `name` 属性作为菜单标签的 key。当 `name` 为英文时，即使配置了 `locale` 属性，子菜单项也可能无法正确显示中文标签。

## 解决方案

直接在路由配置中使用中文作为 `name` 属性值：

```ts
// 正确：直接使用中文名
{
  name: '会员管理',
  icon: 'user',
  path: '/member-group',
  routes: [
    { name: '会员管理', path: '/member-group/member', component: './Member' },
    { name: '积分管理', path: '/member-group/points', component: './Points' },
  ],
}

// 错误：使用英文 name + locale 可能不生效
{
  name: 'member-group',
  locale: 'menu.member-group',  // 可能不生效
  ...
}
```

## 关键规则

1. **顶层菜单**: `name` 使用中文
2. **子菜单**: `name` 使用中文
3. **locale 文件**: 只需保留未在 name 中使用的 key（如登录、退出）
4. **重启**: 修改后需要重启 dev server

## 参考文件

- `sports_admin/config/routes.ts` - 路由配置
- `sports_admin/src/locales/zh-CN/menu.ts` - 中文语言包

> 创建于 2026-06-14，修复菜单英文显示问题
