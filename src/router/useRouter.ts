import VueRouter, { Route } from 'vue-router';
import {
  ComponentInternalInstance,
  Ref,
  UnwrapRef,
  getCurrentInstance,
  reactive,
  toRefs,
  watch,
} from '@/plugins/composition';

export const useRouter = (): {
  router: VueRouter;
  route: Ref<UnwrapRef<Route>>;
} => {
  const instance = getCurrentInstance() as ComponentInternalInstance;

  const vm = instance.proxy;

  const state = reactive({
    route: vm.$route,
  });

  watch(
    () => vm.$route,
    (r) => {
      state.route = r;
    }
  );

  return {
    ...toRefs(state),
    router: vm.$router,
  };
};
