<template>
  <div
    class="card-wrapper-left"
    ref="cardRef">
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

    <div class="gallery-wrapper">
      <div
        @click="handleChangeSrc(src)"
        class="gallery-item"
        v-for="(src, index) in gallery"
        :key="index">
        <img
          :src
          alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
  import { ref, onMounted, watch } from 'vue';
  import {
    img_1,
    img_2,
    img_3,
    img_4,
    img_5,
    img_en_1,
    img_en_2,
    img_en_3,
    img_en_4,
    img_en_5,
  } from '../assets/images';
  import { watchEffect } from 'vue';

  const props = defineProps(['personName', 'language']);
  const emit = defineEmits(['langChange', 'getWrapperElement']);

  const cardRef = ref(null);

  onMounted(() => {
    emit('getWrapperElement', cardRef.value);
  });

  const imgsMap = {
    0: {
      ar: img_1,
      en: img_en_1,
    },
    1: {
      ar: img_2,
      en: img_en_2,
    },
    2: {
      ar: img_3,
      en: img_en_3,
    },
    3: {
      ar: img_4,
      en: img_en_4,
    },
    4: {
      ar: img_5,
      en: img_en_5,
    },
  };

  const gallery = ref(
    Object.values(imgsMap).map((item) => item[props.language])
  );

  watch(
    () => props.language,
    (newVal) => {
      gallery.value = Object.values(imgsMap).map((item) => item[newVal]);
    }
  );

  const imgSrc = ref(imgsMap[0].ar);
  const imgIndex = ref(0);
  const imgsArr = Object.values(imgsMap);

  const handleChangeSrc = (src) => {
    imgSrc.value = src;
  };

  watchEffect(() => {
    imgSrc.value = imgsArr[imgIndex.value][props.language];
  });
</script>
<style scoped>
  .card-wrapper-left {
    display: flex;
    gap: 48px;
    flex: 0 0 auto;
    overflow: hidden;
    position: relative;
  }

  .card-wrapper-left img {
    max-width: 100%;
    height: 100%;
    max-width: 500px;
    width: 500px;
  }

  .receiver-wrapper {
    position: absolute;
    bottom: 40%;
    right: 26%;
    min-width: 239px;
  }

  .receiver-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    color: #08266e;
    margin: 0;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }
  .gallery-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    flex-direction: column;
  }
  @media (max-width: 1157px) {
    .gallery-wrapper{
      flex-direction: row;
    }
    .card-wrapper-left {
      flex-direction: column;
    }
  }
  .gallery-item {
    width: 100px;
    aspect-ratio: 1/1;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
  }

  .gallery-item > img {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    object-fit: cover;
  }
</style>
