import Vue from 'vue';
import filesize from 'filesize';

Vue.filter('dateFormat', (date) => {
  const formatDate = new Date(date);
  return formatDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
});

Vue.filter('fileSizeFormat', (size) => {
  return filesize(size || 0, {
    round: 1,
    roundingMethod: 'ceil',
  });
});
