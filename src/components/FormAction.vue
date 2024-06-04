<template>
  <button
    @click="handleDownload"
    class="download"
    type="button">
    {{ t('message.download') }}
  </button>
  <button
    @click="handleShare"
    class="share share-desktop"
    type="button">
    {{ t('message.share') }}
  </button>
  <button
    @touchstart="handleShare"
    class="share share-mobile"
    type="button">
    {{ t('message.share') }}
  </button>
  <button
    @click="
      () => {
        $emit('reCreate');
        $emit('reset');
      }
    "
    type="button"
    class="reload">
    {{ t('message.redo') }}
  </button>
</template>

<script setup>
  import { useI18n } from 'vue-i18n';
  import html2canvas from 'html2canvas';
  import domtoimage from 'dom-to-image-more';
  defineOptions({
    inheritAttrs: false,
  });

  const { t } = useI18n();

  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  const handleShare = async () => {
    const element = document.getElementById('el');
    const imageData = await domtoimage.toPng(element, {
      quality: 1,
      corsImage: true,
    });
    console.log(imageData)
    element.classList.add('scale');
    // const imageData = await htmlToImage.toPng(element);
    // const canvas = await html2canvas(element, {
    //   scale: window.devicePixelRatio, // Use the device pixel ratio for better quality
    //   useCORS: true, // Handle CORS issues
    // });
    // element.classList.remove('scale');
    // const imageData = canvas.toDataURL('image/jpeg');

    const blob = dataURItoBlob(imageData);
    const filesArray = [new File([blob], 'Shams.jpg', { type: 'image/jpeg' })];

    if (!navigator.share || !navigator.canShare({ files: filesArray })) {
      alert('Your browser does not support this feature');
      return;
    }

    try {
      await navigator.share({ files: filesArray });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('el');

    element.classList.add('scale');

    const imageData = await domtoimage.toPng(element, {
      quality: 1,
      corsImage: true,
    });

    const a = document.createElement('a');
    a.href = imageData.replace('image/png', 'image/octet-stream');
    a.download = 'Shams.png';
    a.click();
    a.remove();

    // html2canvas(element, {
    //   scale: window.devicePixelRatio, // Use the device pixel ratio for better quality
    //   useCORS: true, // Handle CORS issues
    // }).then((canvas) => {
    //   element.classList.remove('scale');
    //   const a = document.createElement('a');
    //   a.href = canvas
    //     .toDataURL('image/png')
    //     .replace('image/png', 'image/octet-stream');
    //   a.download = 'Shams.png';
    //   a.click();
    //   a.remove();
    // });
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

  /* Ensure the scaling class doesn't affect the final canvas size */
  .scale {
    transform: scale(1);
  }
</style>
