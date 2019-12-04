import VueI18n from 'vue-i18n'
import Vue from 'vue'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import jaLocale from 'element-ui/lib/locale/lang/ja'
import zh from '../../../langs/zh'
import ja from '../../../langs/ja'
Vue.use(VueI18n)
let locale = 'zh_CN'

let messages = {
  "zh_CN": {
    ...zh,
    ...zhLocale
  },
  "ja": {
    ...ja,
    ...jaLocale
  }
}
export default new VueI18n({
  locale: locale,  // 语言标识
  messages: messages,
  silentTranslationWarn: true // 去除console中黄色报错
})
