
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/user', component: () => import('pages/User.vue') },
      { path: '/book', component: () => import('pages/Book.vue') },
      { path: '/borrowed', component: () => import('pages/Borrowed.vue') },
      { path: '/returned', component: () => import('pages/Returned.vue') },
      { path: '/fine', component: () => import('pages/Fine.vue') },
      { path: '/generator', component: () => import('pages/Generator.vue') },
      { path: '/library/login', component: () => import('pages/LibrarianLogin.vue') },
      { path: '/user/login', component: () => import('pages/UserLogin.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
