import type { RouteRecordRaw } from 'vue-router';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Wheeler Universe Blog',
    },
  },
  {
    path: '/blog/:slug',
    name: 'BlogRedirect',
    component: () => import('@/views/BlogRedirectView.vue'),
    meta: {
      title: 'Redirecting...',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: 'Page Not Found',
    },
  },
];

const router = createRouter({
  history:
    typeof window !== 'undefined'
      ? createWebHistory(import.meta.env.BASE_URL)
      : createMemoryHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0 };
    }
  },
});

// Global navigation guards - only apply in client mode
if (typeof window !== 'undefined') {
  router.beforeEach(to => {
    // Update document title
    if (to.meta.title) {
      document.title = to.meta.title as string;
    }
  });
}

export default router;
