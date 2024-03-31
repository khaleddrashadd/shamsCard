<template>
  <button
    @click="handleDownload"
    class="download"
    type="button">
    تحميل
  </button>
  <button
    @click="handleShare"
    class="share"
    type="button">
    مشاركة
  </button>
  <button
    @click="()=>{
      $emit('reCreate')
      $emit('reset')
    }"
    type="button"
    class="reload">
    اعادة مره اخرى
  </button>
</template>
<script setup>
  import { onMounted } from 'vue';
  import html2canvas from 'html2canvas';

  defineOptions({
    inheritAttrs: false,
  });

  const element = document.querySelector('.card-wrapper-left');

  const handleShare = () => {
    element.classList.add('scale');
    html2canvas(element).then((canvas) => {
      document.body.appendChild(canvas);

      // Convert canvas to data URL
      const imageData = canvas.toDataURL('image/jpeg');

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

      // Convert data URL to Blob
      const blob = dataURItoBlob(imageData);

      // Create a File instance from the Blob
      const filesArray = [
        new File([blob], 'Eid-Mubarak.jpg', { type: 'image/jpeg' }),
      ];

      if (navigator.share) {
        navigator
          .share({
            title: 'Ramadan Kareem',
            text: 'Check out this beautiful Ramadan Kareem card!',
            files: [...filesArray], // Pass the array directly
          })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        alert('متصفحك لا يدعم هذه الخاصية');
      }
    });
  };

  const handleDownload = () => {
    element.classList.add('scale');
    if (screen.width < 767) {
      html2canvas(document.querySelector('.card-wrapper-left'), {
        width: 320,
        height: 320,
        scale: 3,
      }).then((canvas) => {
        document.body.appendChild(canvas);
        var a = document.createElement('a');
        a.href = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');
        a.download = 'Eid-Mubarak.png';
        a.click();
      });
    } else {
      html2canvas(element).then(
        (canvas) => {
          document.body.appendChild(canvas);
          const a = document.createElement('a');
          a.href = canvas
            .toDataURL('image/png', 0.25)
            .replace('image/png', 'image/octet-stream');
          a.download = 'Eid-Mubarak.png';
          a.click();
          a.remove();
          
        }
      );
    }
  };
</script>
<style></style>
