import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'
import { tabBar } from './src/tabbar/config'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: '体育服务',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FAFAFA',
  },
  easycom: {
    autoscan: true,
    custom: {
        "^tn-(.*)-(item|group)$": "@tuniao/tnui-vue3-uniapp/components/$1/src/$1-$2.vue",
      "^tn-(.*)": "@tuniao/tnui-vue3-uniapp/components/$1/src/$1.vue",  
      '^fg-(.*)': '@/components/fg-$1/fg-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
  // tabbar 的配置统一在 “./src/tabbar/config.ts” 文件中
  tabBar: tabBar as any,
})
