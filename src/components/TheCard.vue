<template>
  <div class="card-wrapper-left">
    <div ref="cardRef" class="hide-mob scale" id="el">
      <div class="img-container">
        <img :src="imgSrc" alt="Shams-Eids" class="card-img" />
      </div>
      <div class="receiver-wrapper">
        <p class="receiver-name">
          {{ personName }}
        </p>
        <p class="receiver-position">
          {{ personPosition }}
        </p>
      </div>
      <div class="receiver-mail receiver-data">
        <p>{{ personMail }}</p>
      </div>
      <div class="receiver-phone receiver-data">
        <p>{{ personPhone }}</p>
      </div>
      <div class="receiver-website receiver-data">
        <p>{{ websiteUrl }}</p>
      </div>
      <div class="profile-img-container">
        <img
          :src="personImg || placeHolderImg"
          alt="person image"
          class="profile-img"
        />
      </div>
      <div class="qr-container" v-if="qrData">
        <qrcode-vue :value="qrData" level="L" :render-as="renderAs" />
      </div>
    </div>
  </div>
</template>
<script setup>
import QrcodeVue from "qrcode.vue";

import { ref, onMounted } from "vue";
import imgSrc from "../assets/images/shams-card.jpg";
import placeHolderImg from "../assets/images/placeholder.png";

const props = defineProps([
  "personName",
  "language",
  "personImg",
  "personPosition",
  "personMail",
  "personPhone",
  "qrData",
]);
const emit = defineEmits(["langChange", "getWrapperElement"]);

const cardRef = ref(null);
const renderAs = ref("svg");

const websiteUrl = "shams.gov.sa";

onMounted(() => {
  emit("getWrapperElement", cardRef.value);
});
</script>
<style scoped>
.card-wrapper-left {
  display: flex;
  gap: 48px;
  flex: 0 0 auto;
  position: relative;
}
.img-container{
  height: 100%;
  width: 500px;
  overflow: hidden;
  background: red;
}
.card-wrapper-left .card-img {
  /*max-width: 100%;*/
  /* width: 500px; */
  height: 100%;
  width: 100%;
}

.receiver-wrapper {
  position: absolute;
  /* top: 27%; */
  bottom: 64%;
}

.receiver-name,
.receiver-position {
  font-weight: 400;
  font-size: 1.5rem;
  color: white;
  margin: 0;
  width: 100%;
  text-align: center;
  white-space: wrap;
  display: inline-block;
}

.receiver-position {
  margin-top: 16px;
}

@media (max-width: 1157px) {
  .card-wrapper-left {
    flex-direction: column;
  }
}
.profile-img-container {
  position: absolute;
  top: 13%;
  left: 39%;
  overflow: hidden;
  width: 20%;
  height: 11%;
  border-radius: 50%;
  border: 3px solid rgb(161, 6, 6);
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.receiver-data {
  position: absolute;
  color: white;
  font-size: 21px;
}
.receiver-mail {
  left: 25%;
  /* transform: translateY(-4px); */
  bottom: 47%;
}
.receiver-phone {
  left: 25%;
  /* transform: translateY(-66px); */
  bottom: 54%;
  direction: ltr;
}
.receiver-website {
  left: 25%;
  bottom: 40%;
}

.qr-container {
  position: absolute;
  bottom: 18%;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  border: 2px solid white;
}

@media (max-width: 600px) {
  .card-wrapper-left .card-img {
    display: flex;
    justify-content: center;
    align-items: center;
    /* height: calc(100% - 311px); */
    /* width: calc(100% + 3px); */
    object-fit: cover;
    /* aspect-ratio: 467.59/834.87; */
  }
  .profile-img-container {
    /* width: 60px;
    height: 60px; */
  }

  .receiver-data {
    font-size: 0.75rem;
  }
  .receiver-name {
    font-size: 0.75rem;
  }
  .receiver-position {
    font-size: 0.75rem;
    margin-top: 10px;
  }
  .receiver-phone {
    /* transform: translateY(-41px); */
  }
  .receiver-website {
    bottom: 39%;
  }
  .qr-container {
    bottom: 7%;
  }
}
@media (max-width: 440px) {
  .card-wrapper-left .card-img {
    height: 100%;
    width: 100%;
  }
  .profile-img-container {
    /* width: 60px;
    height: 60px; */
  }

  .receiver-data {
    font-size: 0.75rem;
  }
  .receiver-name {
    font-size: 0.75rem;
  }
  .receiver-position {
    font-size: 0.75rem;
    margin-top: 10px;
  }
  .receiver-phone {
    bottom: 53%;
    /* transform: translateY(-41px); */
  }
  .receiver-website {
    bottom: 39%;
  }
  .qr-container {
    bottom: 7%;
  }
}
</style>
