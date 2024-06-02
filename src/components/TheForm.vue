<template>
  <div class="card-wrapper-right">
    <div class="card-wrapper-right-container">
      <img
        class="logo"
        :src="logoSrc"
        alt="shams-logo" />
      <p>{{ t('message.cardMessage') }}</p>
      <form>
        <div class="name-input">
          <label
            v-if="!isCreated"
            for="photo"
            >{{ t('message.enterPhoto') }}</label
          >
          <input
            v-if="!isCreated"
            class="input-file"
            type="file"
            accept="image/*"
            @change="handleChangeImg" />

          <label
            v-if="!isCreated"
            for="name"
            >{{ t('message.enterName') }}</label
          >
          <input
            v-if="!isCreated"
            maxlength="30"
            class="input-name"
            :class="{ 'red-border': !isNameValid && startValidate }"
            type="text"
            :placeholder="t('message.name')"
            @input="() => (isNameValid = !!nameInput.trim())"
            v-model.trim="nameInput" />
          <label
            class="alert"
            v-if="!isNameValid && startValidate"
            >{{ t('message.nameValidation') }}</label
          >

          <label
            v-if="!isCreated"
            for="position"
            >{{ t('message.enterPosition') }}</label
          >
          <input
            v-if="!isCreated"
            maxlength="30"
            class="input-name"
            :class="{ 'red-border': !isPositionValid && startValidate }"
            type="text"
            :placeholder="t('message.position')"
            @input="() => (isPositionValid = !!positionInput.trim())"
            v-model.trim="positionInput" />
          <label
            class="alert"
            v-if="!isPositionValid && startValidate"
            >{{ t('message.positionValidation') }}</label
          >

          <label
            v-if="!isCreated"
            for="phone"
            >{{ t('message.enterPhone') }}</label
          >
          <input
            v-if="!isCreated"
            maxlength="15"
            class="input-name"
            :class="{ 'red-border': !isPhoneValid && startValidate }"
            type="text"
            :placeholder="t('message.phone')"
            @input="() => (isPhoneValid = !!phoneInput.trim())"
            v-model.trim="phoneInput" />
          <label
            class="alert"
            v-if="!isPhoneValid && startValidate"
            >{{ t('message.phoneValidation') }}</label
          >

          <label
            v-if="!isCreated"
            for="email"
            >{{ t('message.enterEmail') }}</label
          >
          <input
            v-if="!isCreated"
            maxlength="50"
            class="input-name"
            :class="{ 'red-border': !isEmailValid && startValidate }"
            type="email"
            :placeholder="t('message.email')"
            @input="() => (isEmailValid = !!emailInput.trim())"
            v-model.trim="emailInput" />
          <label
            class="alert"
            v-if="!isEmailValid && startValidate"
            >{{ t('message.emailsValidation') }}</label
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

  import { shamsLogo, shamsLogoEn } from '../assets/images';
  const props = defineProps(['wrapperElement', 'language']);

  const logoSrc = ref(shamsLogo);

  watch(
    () => props.language,
    (newVal) => {
      logoSrc.value = newVal === 'ar' ? shamsLogo : shamsLogoEn;
    }
  );

  const { t } = useI18n();

  const nameInput = ref('');
  const positionInput = ref('');
  const phoneInput = ref('');
  const emailInput = ref('');
  const photoInput = ref(null);
  const isCreated = ref(false);

  const qrData = ref('');

  const isNameValid = ref(false);
  const isPositionValid = ref(false);
  const isPhoneValid = ref(false);
  const isEmailValid = ref(false);
  const startValidate = ref(false);

  const reCreate = () => {
    isCreated.value = false;
    nameInput.value = '';
    positionInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
    photoInput.value = '';

    emit('createQR', null);
  };
  const emit = defineEmits([
    'nameEnter',
    'imageEnter',
    'positionEnter',
    'phoneEnter',
    'mailEnter',
    'createQR',
  ]);
  watch(nameInput, (newVal) => {
    emit('nameEnter', newVal);
  });

  watch(photoInput, (newVal) => {
    emit('imageEnter', newVal);
  });

  watch(positionInput, (newVal) => {
    emit('positionEnter', newVal);
  });

  watch(phoneInput, (newVal) => {
    emit('phoneEnter', newVal);
  });

  watch(emailInput, (newVal) => {
    emit('mailEnter', newVal);
  });

  const handleCreateName = () => {
    startValidate.value = true;

    isNameValid.value = !!nameInput.value.trim();
    isPositionValid.value = !!positionInput.value.trim();
    isPhoneValid.value = !!phoneInput.value.trim();
    isEmailValid.value = !!emailInput.value.trim();

    if (
      isNameValid.value &&
      isPositionValid.value &&
      isPhoneValid.value &&
      isEmailValid.value
    ) {
      isCreated.value = true;
      const contact = {
        name: nameInput.value,
        phoneNumber: phoneInput.value,
        email: emailInput.value,
        position: positionInput.value,
      };
      emit('createQR', contact);
    }
  };

  const handleChangeImg = () => {
    photoInput.value = event.target.files[0];
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

  @media screen and (max-width: 991px) {
    .card-wrapper-right {
      order: 1;
    }
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
    padding-left: 10px;
    margin-bottom: 16px;
    font-family: 'DIN', sans-serif;
    outline: none;
  }
  .name-input .input-file {
    background-color: #fff;
    border: 1px solid #eef0f8;
    border-radius: 6px;
    padding-right: 10px;
    padding: 8px 10px;
    margin-bottom: 16px;
    font-family: 'DIN', sans-serif;
    outline: none;
  }

  .name-input .input-name:focus-visible {
    border: 1px solid #00c4e5;
  }

  .name-input .input-name.red-border,
  .name-input .input-file.red-border {
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

  .small {
    display: flex;
    flex-direction: row;
    gap: 8px;
    font-size: 14px !important;
    margin: 0;
    color: #ffc048 !important;
    margin-bottom: 16px !important;
    font-weight: 500 !important;
  }
  .small img {
    margin: 0;
    padding-bottom: 8px !important;
    width: 16px;
    height: 16px;
  }

  .logo {
    width: 60%;
  }
</style>
