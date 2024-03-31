<template>
  <section class="full-bg">
    <div class="card-wrapper">
      <TheForm
        :language
        @nameEnter="getName"
        :wrapperElement />
      <TheCard
        @lang-change="handleChangeLang"
        :personName="personName"
        :language
        :rootElement />
    </div>
  </section>
</template>
<script setup>
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  import TheForm from './components/TheForm.vue';
  import TheCard from './components/TheCard.vue';

  const { locale } = useI18n();

  const language = ref(
    localStorage.getItem('lang') || window?.navigator?.language || 'ar'
  );

  const rootElement = document.documentElement;
  rootElement.setAttribute('lang', language.value);
  rootElement.setAttribute('dir', language.value === 'ar' ? 'rtl' : 'ltr');
  locale.value = language.value;

  const personName = ref('');
  const wrapperElement = ref(null);
  const getName = (name) => {
    personName.value = name;
  };

  const handleChangeLang = () => {
    locale.value = localStorage.getItem('lang') || 'ar';
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
  }

  .full-bg {
    background-image: url('./images/pattern.png');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    background-position: 100% 100%;
    height: 100%;
  }
</style>
