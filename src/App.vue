<template>
  <section
    class="full-bg"
    :dir="dirEl"
    :lang="langEl">
    <div class="card-wrapper">
      <TheLangSwitcher
        v-model="langEl"
        @lang-change="handleChangeLang" />
      <TheForm
        @nameEnter="getName"
        :wrapperElement />
      <TheCard
        @getWrapperElement="getWrapperElement"
        @lang-change="handleChangeLang"
        :personName="personName"
        :language="langEl" />
    </div>
  </section>
</template>
<script setup>
  import { useI18n } from 'vue-i18n';
  import { ref } from 'vue';
  import TheForm from './components/TheForm.vue';
  import TheCard from './components/TheCard.vue';
  import TheLangSwitcher from './components/TheLangSwitcher.vue';

  const { locale } = useI18n();

  const language =
    localStorage.getItem('lang') || window?.navigator?.language || 'ar';

  const dirEl = ref(language === 'ar' ? 'rtl' : 'ltr');
  const langEl = ref(language);
  const langModel = ref(langEl.value);

  locale.value = language;

  const personName = ref('');
  const wrapperElement = ref(null);
  const getName = (name) => {
    personName.value = name;
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
    background-image: url('./images/pattern.png');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
    background-position: 100% 100%;
    height: 100%;
  }
</style>
