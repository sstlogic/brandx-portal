const layouts = {
  MemberLayout: () => import('@/layouts/MemberLayout/MemberLayout.vue'),
};

export const getLayouts = (): typeof layouts => layouts;

export type Layouts = typeof layouts;
