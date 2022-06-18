import Vue from 'vue';
import filesize from 'filesize';

Vue.filter('initials', (name) => {
  const res = name.replace(/\s+/g, ' ');
  const splitted = res.split(' ').filter((i) => i.match(/[а-яё_-]/));

  return splitted
    .map((word, index) => (index ? word.substring(0, 1).toUpperCase() + '.' : word))
    .join(' ');
});

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
