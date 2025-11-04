const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    name: 'create',
    path: '/create-recipe',
    component: () => import('pages/RecipeCreate.vue')
  },
  {
    name: 'edit',
    path: '/edit/:id',
    component: () => import('pages/RecipeEdit.vue')
  },
  {
    name: 'detail',
    path: '/recipe/:id',
    component: () => import('pages/RecipeDetail.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
