/**
 * @name umi 的路由配置
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: '登录',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        component: '404',
        path: '/user/*',
      },
    ],
  },
  {
    path: '/',
    name: '数据概览',
    icon: 'dashboard',
    component: './Dashboard',
  },
  {
    name: '会员管理',
    icon: 'user',
    path: '/member-group',
    routes: [
      { name: '会员管理', icon: 'user', path: '/member-group/member', component: './Member' },
      { name: '积分管理', icon: 'gift', path: '/member-group/points', component: './Points' },
      { name: '积分规则', icon: 'setting', path: '/member-group/points-rule', component: './PointsRule' },
      { name: '兑换管理', icon: 'shopping', path: '/member-group/exchange', component: './Exchange' },
    ],
  },
  {
    name: '服务管理',
    icon: 'calendar',
    path: '/service-group',
    routes: [
      { name: '预约管理', icon: 'calendar', path: '/service-group/appointment', component: './Appointment' },
      { name: '服务进度', icon: 'LoadingOutlined', path: '/service-group/service-progress/:id', component: './ServiceProgress', hideInMenu: true },
      { name: '服务历史', icon: 'HistoryOutlined', path: '/service-group/service-history', component: './ServiceHistory' },
    ],
  },
  {
    name: '线材管理',
    icon: 'build',
    path: '/wire-group',
    routes: [
      { name: '线材管理', icon: 'build', path: '/wire-group/wire', component: './Wire' },
      { name: '供应商管理', icon: 'truck', path: '/wire-group/supplier', component: './Supplier' },
      { name: '进货管理', icon: 'shopping-cart', path: '/wire-group/purchase', component: './Purchase' },
      { name: '消耗记录', icon: 'scissor', path: '/wire-group/usage', component: './Usage' },
      { name: '报废记录', icon: 'warning', path: '/wire-group/waste', component: './Waste' },
      { name: '库存查询', icon: 'appstore', path: '/wire-group/inventory', component: './Inventory' },
    ],
  },
  {
    name: '二维码',
    icon: 'qrcode',
    path: '/qr-group',
    routes: [
      { name: '二维码管理', icon: 'qrcode', path: '/qr-group/manage', component: './QR' },
      { name: '线材追溯', icon: 'search', path: '/qr-group/trace', component: './QRTrace' },
    ],
  },
  {
    name: '技师管理',
    icon: 'team',
    path: '/technician-group',
    routes: [
      { name: '技师管理', icon: 'team', path: '/technician-group/technician', component: './Technician' },
      { name: '推荐配置', icon: 'bulb', path: '/technician-group/recommendation', component: './Recommendation' },
      { name: '培训管理', icon: 'read', path: '/technician-group/training', component: './Training' },
    ],
  },
  {
    name: '财务管理',
    icon: 'fund',
    path: '/finance-group',
    routes: [
      { name: '财务报表', icon: 'bar-chart', path: '/finance-group/report', component: './Report' },
      { name: '利润分析', icon: 'pie-chart', path: '/finance-group/profit', component: './Finance/Profit' },
      { name: '应付账款', icon: 'credit-card', path: '/finance-group/payable', component: './Finance/Payable' },
      { name: '库存周转', icon: 'sync', path: '/finance-group/turnover', component: './Finance/Turnover' },
      { name: '价格趋势', icon: 'line-chart', path: '/finance-group/price-trend', component: './Finance/PriceTrend' },
    ],
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: '404',
    path: '/*',
  },
];
