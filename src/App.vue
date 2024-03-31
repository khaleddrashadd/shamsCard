<template>
  <section class="full-bg">
    <div class="card-wrapper">
      <TheForm @nameEnter="getName" :wrapperElement />
      <TheCard :personName='personName' />
    </div>
  </section>
</template>
<script setup>
  import { ref } from 'vue';
  import TheForm from './components/TheForm.vue';
  import TheCard from './components/TheCard.vue';

  const personName = ref('');
  const wrapperElement = ref(null);
  const getName = (name) => {
    personName.value = name;
  };
</script>
<style></style>
