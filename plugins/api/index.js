import instances from './instances';
import web from './web';
import disk from './disk';
import geo from './geo';
import dengi from './dengi';

export default (context, inject) => {
  return inject('api', {
    web: () => web(context, instances.web),

    disk: () => disk(context, instances.disk),

    geo: () => geo(instances.geo),

    dengi: () => dengi(instances.dengi),
  });
};
