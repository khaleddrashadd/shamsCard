<template>
  <button @click="handleDownload" class="download" type="button">
    {{ t("message.download") }}
  </button>
  <button @click="handleShare" class="share share-desktop" type="button">
    {{ t("message.share") }}
  </button>
  <button @touchstart="handleShare" class="share share-mobile" type="button">
    {{ t("message.share") }}
  </button>
  <button
    @click="
      () => {
        $emit('reCreate');
        $emit('reset');
      }
    "
    type="button"
    class="reload"
  >
    {{ t("message.redo") }}
  </button>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import html2canvas from "html2canvas";
defineOptions({
  inheritAttrs: false,
});

const props = defineProps(["wrapperElement"]);

const { t } = useI18n();

const element = props.wrapperElement;

// Helper function to convert data URL to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const handleShare = async () => {
  element.classList.add("scale");
  const canvas = await html2canvas(element);
  document.body.appendChild(canvas);
  // Convert canvas to data URL
  const imageData = canvas.toDataURL("image/jpeg");
  // Convert data URL to Blob
  const blob = dataURItoBlob(imageData);
  // Create a File instance from the Blob
  const filesArray = [
    new File([blob], "Shams.jpg", { type: "image/jpeg" }),
  ];
  if (!navigator.share && !navigator.canShare({ files: filesArray })) {
    alert("Your browser does not support this feature");
    return;
  }

  try {
    await navigator.share({
      files: [...filesArray],
    });
  } catch (error) {
    console.log(error);

    // alert('Your browser does not support this feature');
  }
};

const handleDownload = () => {
  element.classList.add("scale");
  if (screen.width < 767) {
    html2canvas(element).then((canvas) => {
      document.body.appendChild(canvas);
      var a = document.createElement("a");
      a.href = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      a.download = "Shams.png";
      a.click();
    });
  } else {
    html2canvas(element).then((canvas) => {
      document.body.appendChild(canvas);
      const a = document.createElement("a");
      a.href = canvas
        .toDataURL("image/png", 0.25)
        .replace("image/png", "image/octet-stream");
      a.download = "Shams.png";
      a.click();
      a.remove();
    });
  }
};
</script>
<style scoped>
.download {
  background: #00c4e5;
  border-radius: 6px;
  height: 37px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: none;
  cursor: pointer;
}

.share {
  background: #08266e;
  border-radius: 6px;
  height: 37px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border: none;
  cursor: pointer;
}

.download,
.reload,
.share {
  margin-bottom: 16px;
}

.reload {
  background: #d4e3f7;
  border-radius: 6px;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #00c4e5;
  height: 47px;
  border: none;
  cursor: pointer;
}

.share-desktop {
  display: block;
}

.share-mobile {
  display: none;
}

@media screen and (max-width: 767px) {
  .share-desktop {
    display: none;
  }

  .share-mobile {
    display: block;
  }
}
</style>
