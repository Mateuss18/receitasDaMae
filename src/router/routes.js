const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('src/layouts/LayoutDefault.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue') },
      { name: 'create', path: '/create-recipe', component: () => import('pages/RecipeCreate.vue') },
      { name: 'detail', path: '/recipe/:id', component: () => import('pages/RecipeDetail.vue') },
      { name: 'update', path: '/update-recipe/:id', component: () => import('pages/RecipeUpdate.vue') }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
