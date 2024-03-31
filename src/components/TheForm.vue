<template>
  <div class="card-wrapper-right">
    <div class="card-wrapper-right-container">
      <img
        src="../assets/images/shams-logo.png"
        alt="shams-logo" />
      <p>بطاقة تهنئة بإسمك</p>
      <form action="">
        <div class="name-input">
          <label
            v-if="!isCreated"
            for="name"
            >ادخل اسمك</label
          >
          <input
            v-if="!isCreated"
            maxlength="30"
            class="input-name"
            type="text"
            placeholder="الاسم"
            @input="()=>isNameValid = !!nameInput.trim()"
            v-model.trim="nameInput" />
          <label
            class="alert"
            v-if="!isNameValid && startValidate"
            >الرجاء ادخال الاسم</label
          >
          <FormAction
            :wrapperElement="wrapperElement"
            v-if="isCreated"
            @reCreate="reCreate"
            @reset="handleReset" />
          <button
            v-if="!isCreated"
            @click="handleCreateName"
            type="button"
            class="name-input-submit">
            إنشاء
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
  import { ref, watch } from 'vue';
  import FormAction from './FormAction.vue';

  defineProps(['wrapperElement']);

  const nameInput = ref('');
  const isCreated = ref(false);
  const isNameValid = ref(false);
  const startValidate = ref(false);

  const reCreate = () => {
    isCreated.value = false;
    nameInput.value = '';
  };
  const emit = defineEmits(['nameEnter']);
  watch(nameInput, (newVal) => {
    emit('nameEnter', newVal);
  });

  const handleCreateName = () => {
    startValidate.value = true;
    if (!isNameValid.value || !nameInput.value) {
      return;
    }
    isCreated.value = true;
  };

  watch(nameInput, (newVal) => {
    if (!newVal && startValidate.value) {
      isNameValid.value = false;
    } 
  });

  const handleReset = () => {
    isCreated.value = false;
    nameInput.value = '';
    startValidate.value = false;
    isNameValid.value = false;
  };

</script>
<style></style>
