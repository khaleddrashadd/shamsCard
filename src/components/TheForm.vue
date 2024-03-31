<template>
  <div class="card-wrapper-right">
    <div class="card-wrapper-right-container">
      <img
        src="../assets/images/shams-logo.png"
        alt="shams-logo" />
      <p>{{ t('message.cardMessage') }}</p>
      <form>
        <div class="name-input">
          <label
            v-if="!isCreated"
            for="name"
            >{{ t('message.enterName') }}</label
          >
          <input
            v-if="!isCreated"
            maxlength="30"
            class="input-name"
            :class="{'red-border': !isNameValid && startValidate}"
            type="text"
            :placeholder="t('message.name')"
            @input="() => (isNameValid = !!nameInput.trim())"
            v-model.trim="nameInput" />
          <label
            class="alert"
            v-if="!isNameValid && startValidate"
            >{{ t('message.nameValidation') }}</label
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
            {{ t('message.create') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
  import { ref, watch } from 'vue';
  import FormAction from './FormAction.vue';
  import { useI18n } from 'vue-i18n';

  defineProps(['wrapperElement']);

  const { t } = useI18n();

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

  const handleReset = () => {
    isCreated.value = false;
    nameInput.value = '';
    startValidate.value = false;
    isNameValid.value = false;
  };

  watch(nameInput, (newVal) => {
    if (!newVal && startValidate.value) {
      isNameValid.value = false;
    }
  });
</script>
<style scoped>
  .card-wrapper-right {
    flex: 0 0 30%;
  }

  .card-wrapper-right-container {
  background-color: #fff;
  border: 1px solid #e5f9fc;
  padding: 75px 24px;
  border-radius: 0px 10px 10px 0px;
}

.card-wrapper-right-container img {
  display: block;
  margin: auto;
  padding-bottom: 32px;
}

.card-wrapper-right-container p {
  font-weight: 700;
  font-size: 18px;
  line-height: 18px;
  color: #00c4e5;
  text-align: center;
}

.name-input {
  display: flex;
  flex-direction: column;
}

.name-input label {
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  color: #08266e;
  padding-bottom: 6px;
}

.name-input .input-name {
  background-color: #fff;
  border: 1px solid #eef0f8;
  border-radius: 6px;
  height: 41px;
  padding-right: 10px;
  margin-bottom: 16px;
  font-family: 'Almarai', sans-serif;
  outline: none;
}
.name-input .input-name:focus-visible {
  border: 1px solid #00c4e5;
}

.name-input .input-name.red-border {
  border-color: #f00;
}


.name-input .alert {
  color: #f00;
  font-size: 14px;
  font-weight: 700;
  margin-top: 12px;
  margin-bottom: 12px;
  padding-bottom: 0;
}

.name-input-submit {
  background: #00c4e5;
  border-radius: 6px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: none;
  cursor: pointer;
  text-align: center;
  padding: 12px 0;
}

</style>
