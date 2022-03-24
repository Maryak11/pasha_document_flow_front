export default (_, inject) => {
  inject('prepareDescription', function (str) {
    const parsed = str.replace(/\s+/g, ' ').substring(0, 160).split(' ');

    parsed.splice(-1, 1);

    while (parsed.join(' ').length > 156) {
      parsed.splice(-1, 1);
    }

    parsed.push('...');
    return parsed.join(' ');
  });
};
