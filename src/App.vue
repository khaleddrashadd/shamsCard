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
<style></style>
