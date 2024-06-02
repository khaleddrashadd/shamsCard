<template>
  <div class="card-wrapper-left">
    <div ref="cardRef" class="hide-mob">
      <img :src="imgSrc" alt="Shams-Eids" />
      <div class="receiver-wrapper">
        <p class="receiver-name">
          {{ personName }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import imgSrc from "../assets/images/shams-card.svg";

const props = defineProps(["personName", "language"]);
const emit = defineEmits(["langChange", "getWrapperElement"]);

const cardRef = ref(null);

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

.card-wrapper-left img {
  /*max-width: 100%;*/
  height: 100%;
  width: 500px;
  /* width: 500px; */
}

.receiver-wrapper {
  position: absolute;
}

.receiver-name {
  font-weight: 500;
  font-size: 16px;
  /* line-height: 18px; */
  color: #08266e;
  margin: 0;
  width: 100%;
  text-align: center;
  white-space: wrap;
  /* overflow: hidden; */
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

@media screen and (max-width: 991px) {
  .gallery-wrapper {
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
