<template>
  <div class="card-wrapper-left">
    <select
      v-model="lang"
      @change="handleChangeLang">
      <option value="arabic">العربية</option>
      <option value="english">English</option>
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
  import { ref, watch } from 'vue';
  defineProps(['personName']);
  const lang = ref('arabic');
  watch(lang, (newVal) => {
    console.log(newVal);
    if (newVal === 'arabic') {
      document.querySelector('html').setAttribute('lang', 'ar');
      document.querySelector('html').setAttribute('dir', 'rtl');
    } else {
      document.querySelector('html').setAttribute('lang', 'en');
      document.querySelector('html').setAttribute('dir', 'ltr');
    }
  });

  import img1 from '../assets/images/bgcard.jpg';
  import img2 from '../assets/images/bgcard2.png';
  import img3 from '../assets/images/pattern.png';

  const imgsMap = {
    0: {
      arabic: img1,
      english: img1,
    },
    1: {
      arabic: img2,
      english: img3,
    },
    2: {
      arabic: img1,
      english: img1,
    },
  };

  const imgSrc = ref(imgsMap[0].arabic);
  const imgIndex = ref(0);
  const imgsArr = Object.values(imgsMap);

  const handleChangeSrc = () => {
    imgIndex.value = (imgIndex.value + 1) % imgsArr.length;
    imgSrc.value = imgsArr[imgIndex.value][lang.value];
  };

  const handleChangeLang = () => {
    imgSrc.value = imgsArr[imgIndex.value][lang.value];
  };
</script>
<style lang=""></style>
