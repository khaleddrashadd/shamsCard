<template>
  <section
    class="full-bg"
    :dir="dirEl"
    :lang="langEl">
    <div class="card-wrapper">
      <!-- <TheLangSwitcher
        v-model="langEl"
        @lang-change="handleChangeLang" /> -->
      <TheForm
        @nameEnter="getName"
        @imageEnter="getImg"
        @positionEnter="getPosition"
        @phoneEnter="getPhone"
        @mailEnter="getMail"
        @createQR="createQR"
        :language="langEl"
        :wrapperElement="wrapperElement" />
      <TheCard
        @getWrapperElement="getWrapperElement"
        @lang-change="handleChangeLang"
        :personName="personName"
        :personImg="personImg"
        :personPosition="personPosition"
        :personPhone="personPhone"
        :personMail="personMail"
        :qrData="qrData"
        :language="langEl" />
    </div>
  </section>
</template>
<script setup>
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  import TheForm from '../components/TheForm.vue';
  import TheCard from '../components/TheCard.vue';
  import TheLangSwitcher from '../components/TheLangSwitcher.vue';

  const { locale } = useI18n();

  // const language =
  //   localStorage.getItem('lang') ||
  //   window?.navigator?.language.toLocaleLowerCase().slice(0, 2) ||
  //   'ar';
  const language = 'en';

  const dirEl = ref(language === 'ar' ? 'rtl' : 'ltr');
  const langEl = ref(language);

  locale.value = language;

  const personName = ref('');
  const personImg = ref('');
  const personPosition = ref('');
  const personPhone = ref('');
  const personMail = ref('');
  const qrData = ref('');

  const wrapperElement = ref(null);
  const getName = (name) => {
    personName.value = name;
  };

  const getImg = (img) => {
    if (!img) {
      return (personImg.value = '');
    }
    const imgSrc = URL.createObjectURL(img);
    personImg.value = imgSrc;
  };

  const getPosition = (pos) => {
    personPosition.value = pos;
  };
  const getPhone = (phone) => {
    personPhone.value = phone;
  };
  const getMail = (mail) => {
    personMail.value = mail;
  };

  const createQR = (contact) => {
  if (!contact) return (qrData.value = '');

  const { name, phoneNumber, email, position } = contact;
  
  // Split the name into first and last name
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  const vCardData = `BEGIN:VCARD
VERSION:4.0
N:${lastName};${firstName};;;
FN:${name}
TITLE:${position}
TEL;TYPE=CELL:${phoneNumber}
EMAIL;TYPE=WORK,INTERNET:${email}
END:VCARD`;

  qrData.value = vCardData;
};

  const handleChangeLang = () => {
    locale.value = localStorage.getItem('lang') || 'ar';

    langEl.value = locale.value;
    dirEl.value = locale.value === 'ar' ? 'rtl' : 'ltr';
  };

  const getWrapperElement = (element) => {
    wrapperElement.value = element;
  };
</script>

<style scoped>
  .card-wrapper {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    min-height: 100vh;
    height: 100%;
    flex-wrap: wrap;
  }

  .full-bg {
    /* background-image: url('./images/pattern.png'); */
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    background-position: 100% 100%;
    height: 100%;
  }
</style>
