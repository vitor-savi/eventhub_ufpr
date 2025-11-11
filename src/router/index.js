import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import ClientLayout from '../layouts/ClientLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import { useAuthStore } from '../store/auth'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/cadastro',
    component: Register
  },
  {
    path: '/esqueci-senha',
    component: () => import('../pages/ForgotPassword.vue')
  },
  {
    path: '/servicos',
    component: () => import('../pages/Servicos.vue')
  },
  {
    path: '/sobre-nos',
    component: () => import('../pages/SobreNos.vue')
  },
  {
    path: '/contato',
    component: () => import('../pages/Contato.vue')
  },
  
  // Client routes
  {
    path: '/cliente',
    component: ClientLayout,
    meta: { requiresAuth: true, role: 'cliente' },
    children: [
      {
        path: 'dashboard',
        component: () => import('../pages/ClientDashboard.vue'),
      },
      {
        path: 'novo-evento',
        component: () => import('../pages/NewEventRequest.vue'),
      },
      {
        path: 'meus-eventos',
        component: () => import('../pages/MyEvents.vue'),
      },
      {
        path: 'eventos/:id',
        component: () => import('../pages/EventDetails.vue'),
      },
      {
        path: 'orcamentos',
        component: () => import('../pages/MyBudgets.vue'),
      },
      {
        path: 'orcamentos/:id',
        component: () => import('../pages/BudgetDetails.vue'),
      },
      {
        path: 'perfil',
        component: () => import('../pages/ClientProfile.vue'),
      }
    ]
  },

  // Admin routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: 'dashboard',
        component: () => import('../pages/AdminDashboard.vue'),
      },
      {
        path: 'orcamentos',
        component: () => import('../pages/AdminBudgets.vue'),
      },
      {
        path: 'orcamentos/:id/analisar',
        component: () => import('../pages/AdminBudgetEditor.vue'),
      },
      {
        path: 'orcamentos/:id',
        component: () => import('../pages/BudgetDetails.vue'),
      },
      {
        path: 'profissionais',
        component: () => import('../pages/AdminStaffManagement.vue'),
      },
      {
        path: 'profissionais/:eventId',
        component: () => import('../pages/AdminStaffAllocation.vue'),
      }
    ]
  },

  // Catch-all route for 404
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  
  // Always allow public routes
  const publicRoutes = ['/', '/login', '/cadastro', '/esqueci-senha']
  if (publicRoutes.includes(to.path)) {
    return next()
  }

  // Check authentication for protected routes
  if (to.meta.requiresAuth) {
    if (!auth.user) {
      // Redirect to login if not authenticated
      return next('/login')
    }

    // Check role-based access
    if (to.meta.role && auth.user.role !== to.meta.role) {
      // Redirect based on user role
      const homePath = auth.user.role === 'cliente' ? '/cliente/dashboard' : '/admin/dashboard'
      return next(homePath)
    }
  }

  next()
})

export default router
