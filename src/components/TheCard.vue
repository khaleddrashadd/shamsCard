<template>
  <div
    class="card-wrapper-left"
    >
    <div ref="cardRef"
      class="hide-mob"
      @click="handleChangeSrc">
      <img
        :src="imgSrc"
        alt="Shams-Eids" />
      <div
        class="receiver-wrapper"
        :style="{ bottom: imgTop }">
        <p
          class="receiver-name"
          :class="{ 'light-text': isLight }">
          {{ personName }}
        </p>
      </div>
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
  const isLight = ref(false);
  const imgTop = ref(props.language === 'ar' ? '20.5%' : '19.5%');
  const imgRight = ref('30%');

  onMounted(() => {
    emit('getWrapperElement', cardRef.value);
  });

  const imgsMap = {
    0: {
      ar: {
        src: img_1,
        right: '30%',
        top: '20.5%',
      },
      en: {
        src: img_en_1,
        right: '30%',
        top: '19.5%',
      },
      dark: false,
    },
    1: {
      ar: {
        src: img_2,
        right: '30%',
        top: '17%',
      },
      en: {
        src: img_en_2,
        right: '30%',
        top: '16%',
      },
      dark: true,
    },
    2: {
      ar: {
        src: img_3,
        right: '30%',
        top: '26%',
      },
      en: {
        src: img_en_3,
        right: '30%',
        top: '24%',
      },
      dark: false,
    },
    3: {
      ar: {
        src: img_4,
        right: '30%',
        top: '8.5%',
      },
      en: {
        src: img_en_4,
        right: '30%',
        top: '9%',
      },
      dark: true,
    },
    4: {
      ar: {
        src: img_5,
        right: '30%',
        top: '12.5%',
      },
      en: {
        src: img_en_5,
        right: '30%',
        top: '9%',
      },
      dark: false,
    },
  };

  const gallery = ref(
    Object.values(imgsMap).map((item) => item[props.language].src)
  );

  watch(
    () => props.language,
    (newVal) => {
      gallery.value = Object.values(imgsMap).map((item) => item[newVal].src);
      imgTop.value = newVal === 'ar' ? '20.5%' : '19.5%';
      isLight.value = false;
    }
  );

  const imgSrc = ref(imgsMap[0].ar.src);
  const imgIndex = ref(0);
  const imgsArr = Object.values(imgsMap);

  const handleChangeSrc = (src) => {
    imgSrc.value = src;
    const index = Object.keys(imgsMap).find(
      (key) => imgsMap[key][props.language].src === src
    );
    isLight.value = imgsMap[index].dark;

    imgTop.value = imgsMap[index][props.language].top;
    imgRight.value = imgsMap[index][props.language].right;
  };

  watchEffect(() => {
    imgSrc.value = imgsArr[imgIndex.value][props.language].src;
  });
</script>
<style scoped>
  .card-wrapper-left {
    display: flex;
    gap: 48px;
    flex: 0 0 auto;
    position: relative;
  }

  .card-wrapper-left img {
    max-width: 100%;
    height: 100%;
    max-width: 500px;
    /* width: 500px; */
  }

  .receiver-wrapper {
    position: absolute;
  }

  .receiver-name {
    font-weight: 500;
    font-size: 16px;
    line-height: 18px;
    color: #08266e;
    margin: 0;
    width: 100%;
    text-align: center;
    white-space: wrap;
    overflow: hidden;
    font-weight: bold;
    display: inline-block;
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
    .gallery-wrapper {
      flex-direction: row;
    }
    .card-wrapper-left {
      flex-direction: column;
    }
  }

    @media screen and (max-width: 991px){
    .gallery-wrapper{
      order: -1;
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

  .light-text {
    color: #fff;
  }
</style>
