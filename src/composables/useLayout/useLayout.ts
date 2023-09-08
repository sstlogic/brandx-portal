import { Route } from '@/router/types';
import { RouteRecord } from 'vue-router';
import { computed, ref } from '@/plugins/composition';
import { getLayouts } from './getLayouts';
import { useRouter } from '@/router/useRouter';

const isNavShowing = ref(true);

type Layout = () => Promise<typeof import('*.vue')>;

export const useLayout = () => {
  const showNav = (): void => {
    isNavShowing.value = true;
  };

  const hideNav = (): void => {
    isNavShowing.value = false;
  };

  const layouts = getLayouts();

  const getLayout = (layout: keyof typeof layouts) => {
    return layouts[layout];
  };

  const routeHasLayout = (route: Route): null | string => {
    return route.meta?.layout ?? null;
  };

  const getParentLayout = (route: RouteRecord): Layout | null => {
    if (route.parent?.meta?.layout) {
      return getLayout(route.parent?.meta?.layout) as Layout;
    }

    if (route.parent?.parent) {
      return getParentLayout(route.parent);
    }

    return null;
  };

  const currentlayout = computed(() => {
    const { route } = useRouter();

    if (routeHasLayout(route.value as Route) && route.value.meta) {
      return getLayout(route.value.meta.layout);
    }

    const matched = route.value.matched.find((record) => record.name === route.value.name);

    if (matched) {
      return getParentLayout(matched as RouteRecord);
    }

    return route.value.meta?.layout;
  });

  return { isNavShowing, hideNav, showNav, currentlayout };
};
