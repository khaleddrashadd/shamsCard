import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createI18n } from 'vue-i18n';

const messages = {
  en: {
    message: {
      enterName: 'Enter your name',
      name: 'Name',
      create: 'Create',
      nameValidation: 'Please enter your name',
      cardMessage: 'A greeting card with your name',
      download: 'Download',
      share: 'Share',
      redo:"Try again",
    },
  },
  ar: {
    message: {
      enterName: 'ادخل اسمك',
      name: 'الاسم',
      create: 'انشاء',
      nameValidation: 'الرجاء ادخال الاسم',
      cardMessage: 'بطاقة تهنئة بإسمك',
      download: 'تحميل',
      share: 'مشاركة',
      redo: 'اعادة مره اخرى',
    },
  },
};

const i18n = createI18n({
  locale: 'ar',
  messages,
  legacy: false,
  warnHtmlInMessage: 'warn',
  allowComposition: true,
  fallbackLocale: 'en',
});

createApp(App).use(i18n).mount('#app');
