<template>
  <div class="lang-switch">
    <button
      @click="handleChangeLang"
      class="lang-switch-btn">
      {{ model }}
    </button>
  </div>
</template>
<script setup>
import { nextTick } from 'vue';

  const props = defineProps(['language']);
  const model = defineModel();
  const emit = defineEmits(['langChange']);

  const handleChangeLang =async () => {
    model.value = model.value === 'ar' ? 'en' : 'ar';
    await nextTick();
    localStorage.setItem('lang', model.value);

    emit('langChange');
  };
</script>
<style scoped>
  .lang-switch {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .lang-switch-btn {
    background-color: #fff;
    border-radius: 6px;
    color: #00c4e5;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    border: 1px solid #00c4e5;
    cursor: pointer;
    text-align: center;
    text-align: center;
    padding: 4px;
  }
</style>
