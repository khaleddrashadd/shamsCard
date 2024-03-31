<template>
  <div class="card-wrapper-left">
    <select
      v-model="lang"
      @change="handleChangeLang">
      <option value="ar">العربية</option>
      <option value="en">English</option>
    </select>
    <div class="receiver-wrapper">
      <p class="receiver-name">{{ personName }}</p>
    </div>
    <div
      class="hide-mob"
      @click="handleChangeSrc">
      <img
        :src="imgSrc"
        alt="Shams-Eids" />
    </div>
    <div class="show-mob">
      <img
        :src="imgSrc"
        alt="Shams-Eids" />
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  const props = defineProps(['personName', 'language','rootElement']);

  const emit = defineEmits(['langChange']);

  const lang = ref(props.language);

  import img1 from '../assets/images/bgcard.jpg';
  import img2 from '../assets/images/bgcard2.png';
  import img3 from '../assets/images/pattern.png';

  const imgsMap = {
    0: {
      ar: img1,
      en: img1,
    },
    1: {
      ar: img2,
      en: img3,
    },
    2: {
      ar: img1,
      en: img1,
    },
  };

  const imgSrc = ref(imgsMap[0].ar);
  const imgIndex = ref(0);
  const imgsArr = Object.values(imgsMap);

  const handleChangeSrc = () => {
    imgIndex.value = (imgIndex.value + 1) % imgsArr.length;
    imgSrc.value = imgsArr[imgIndex.value][lang.value];
  };

  const handleChangeLang = () => {
    const langValue = lang.value.toLowerCase().slice(0, 2);
    imgSrc.value = imgsArr[imgIndex.value][lang.value];
    localStorage.setItem('lang', langValue);

   props.rootElement.setAttribute('lang', langValue);
    props.rootElement
      .setAttribute('dir', langValue === 'ar' ? 'rtl' : 'ltr');

    emit('langChange');
  };
</script>
<style lang=""></style>
