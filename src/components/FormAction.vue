<template>
  <button
    @click="handleDownload"
    class="download"
    type="button">
    {{ t('message.download') }}
  </button>
  <button
    @click="handleShare"
    @touchstart="handleTouchShare"
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

  const handleShare = async () => {
    element.classList.add('scale');
    const canvas = await html2canvas(element);
    document.body.appendChild(canvas);
    // Convert canvas to data URL
    const imageData = canvas.toDataURL('image/jpeg');
    // Convert data URL to Blob
    const blob = dataURItoBlob(imageData);
    // Create a File instance from the Blob
    const filesArray = [
      new File([blob], 'Eid-Mubarak.jpg', { type: 'image/jpeg' }),
    ];
    if (!navigator.share && !navigator.canShare({ files: filesArray })) {
      alert('Your browser does not support this feature');
      return;
    }

    try {
      await navigator.share({
        files: [...filesArray],
      });
    } catch (error) {
      console.log("💥 ~ handleShare ~ error", error)

      // alert('Your browser does not support this feature');
    }
  };

  const handleTouchShare = () => {
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    if (check) {
      handleShare();
    }
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
