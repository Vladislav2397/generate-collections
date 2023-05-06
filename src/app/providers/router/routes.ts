import Home from '@/pages/Home/Home.vue'
import About from '@/pages/About/About.vue'

export const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('@/pages/About/About.vue'),
    },
]
