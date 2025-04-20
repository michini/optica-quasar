const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/singlePage/IndexPage.vue') }],
  },
  {
    path: '/auth',
    name: 'auth',
    //component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'auth.login',
        path: 'login',
        meta: { title: 'Login Page' },
        component: () => import('src/pages/auth/LoginPage.vue'),
      },
      {
        name: 'auth.register',
        path: 'register',
        meta: { title: 'Register Page' },
        component: () => import('src/pages/auth/RegisterPage.vue'),
      },
    ],
    meta: { requiresAuth: false },
  },
  {
    path: '/dashboard',
    component: () => import('src/layouts/home/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('src/pages/home/DashboardPage.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },
  {
    path: '/inventario',
    name: 'inventario',
    component: () => import('src/layouts/home/HomeLayout.vue'),
    // children: [
    //   {
    //     path: '',
    //     component: () => import('src/pages/home/inventario/IndexPage.vue'),
    //   },
    // ],
    meta: { requiresAuth: true },
  },
  {
    path: '/ajustes',
    name: 'ajustes',
    component: () => import('src/layouts/home/HomeLayout.vue'),
    children: [
      {
        path: '',
        name: 'ajustes.index',
        meta: { title: 'Ajustes Page' },
        component: () => import('src/pages/home/ajustes/IndexPage.vue'),
      },
      {
        path: '/ajustes/tipo-producto',
        name: 'ajustes.tipo-producto',
        meta: { title: 'Tipo producto' },
        component: () => import('src/pages/home/ajustes/sections/AjustesTipoProductoPage.vue'),
      },
    ],
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
