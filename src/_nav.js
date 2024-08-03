export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Páginas',
  },
  {
    component: 'CNavItem',
    name: 'Usuarios',
    to: '/usuarios',
    icon: 'cil-people',
  },
]
