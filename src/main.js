import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createI18n } from 'vue-i18n';
import { messages } from './localization';

const i18n = createI18n({
  locale: 'ar',
  messages,
  legacy: false,
  warnHtmlInMessage: 'warn',
  allowComposition: true,
  fallbackLocale: 'en',
});

createApp(App).use(i18n).mount('#app');
