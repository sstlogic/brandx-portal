const layouts = {
  MemberLayout: () => import('@/layouts/MemberLayout/MemberLayout.vue'),
  SubscriptionLayout: () => import('@/layouts/SubscriptionLayout/SubscriptionLayout.vue'),
};

export const getLayouts = (): typeof layouts => layouts;

export type Layouts = typeof layouts;
