<template>
  <button
    @click="handleDownload"
    class="download"
    type="button">
    {{ t('message.download') }}
  </button>
  <button
    @click="handleShare"
    class="share"
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
  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps(['wrapperElement']);

  const { t } = useI18n();

  const element = props.wrapperElement;

  // const handleShare = () => {
  //   if(navigator.vibrate) {
  //     navigator.vibrate(10);
  //   }
  //   element.classList.add('scale');
  //   html2canvas(element).then((canvas) => {
  //     document.body.appendChild(canvas);

  //     // Convert canvas to data URL
  //     const imageData = canvas.toDataURL('image/jpeg');

  //     // Helper function to convert data URL to Blob
  //     function dataURItoBlob(dataURI) {
  //       const byteString = atob(dataURI.split(',')[1]);
  //       const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  //       const ab = new ArrayBuffer(byteString.length);
  //       const ia = new Uint8Array(ab);
  //       for (let i = 0; i < byteString.length; i++) {
  //         ia[i] = byteString.charCodeAt(i);
  //       }
  //       return new Blob([ab], { type: mimeString });
  //     }

  //     // Convert data URL to Blob
  //     const blob = dataURItoBlob(imageData);

  //     // Create a File instance from the Blob
  //     const filesArray = [
  //       new File([blob], 'Eid-Mubarak.jpg', { type: 'image/jpeg' }),
  //     ];
  //     if (navigator.canShare&&navigator.share&&navigator.canShare({ files: filesArray })) {
  //       navigator
  //         .share({
  //           files: [...filesArray],
  //         })
  //         .then(() => console.log('Successful share'))
  //         .catch((error) => console.log('Error sharing', error));
  //     } else {
  //       alert('متصفحك لا يدعم هذه الخاصية');
  //     }
  //   });
  // };




  const handleShare = () => {
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
    element.classList.add('scale');
    html2canvas(element).then((canvas) => {
        // Convert canvas to data URL
        const imageData = canvas.toDataURL('image/jpeg');

        // Create a Blob from the data URL
        const blob = dataURItoBlob(imageData);

        // Create a File from the Blob
        const file = new File([blob], 'Eid-Mubarak.jpg', { type: 'image/jpeg' });

        // Check if the browser supports sharing files
        if (navigator.canShare && navigator.share && navigator.canShare({ files: [file] })) {
            // Share the file directly
            navigator.share({ files: [file] })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that don't support file sharing
            alert('Your browser does not support direct sharing. The image has been saved to your device. You can share it manually from your photo gallery.');
        }

        // Helper function to convert data URL to Blob
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
    });
};



  const handleDownload = () => {
    element.classList.add('scale');
    if (screen.width < 767) {
      html2canvas(element).then((canvas) => {
        document.body.appendChild(canvas);
        var a = document.createElement('a');
        a.href = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        a.download = 'Eid-Mubarak.png';
        a.click();
      });
    } else {
      html2canvas(element).then((canvas) => {
        document.body.appendChild(canvas);
        const a = document.createElement('a');
        a.href = canvas
          .toDataURL('image/png', 0.25)
          .replace('image/png', 'image/octet-stream');
        a.download = 'Eid-Mubarak.png';
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
</style>
