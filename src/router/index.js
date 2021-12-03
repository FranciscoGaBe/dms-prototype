import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'

const generateRoutes = (prefix = '', routes) => routes.map(route => ({ ...route, path: `${prefix}/${route.path}` }))

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'login',
		component: Login
	},
	{
		path: '/explorer/:folder',
		name: 'explorer',
		props: true,
		component: () => import(/* webpackChunkName: "explorer" */ '@/views/Explorer.vue'),
		children: generateRoutes('file/:file', [
			{
				path: 'info',
				name: 'info',
				props: true,
				component: () => import(/* webpackChunkName: "fileInfo" */ '@/components/DMSFileInfo.vue')
			},
			{
				path: 'version',
				name: 'version',
				props: true,
				component: () => import(/* webpackChunkName: "fileVersion" */ '@/components/DMSFileVersion.vue')
			},
			{
				path: 'metadata',
				name: 'metadata',
				props: true,
				component: () => import(/* webpackChunkName: "fileVersion" */ '@/components/DMSFileMetadata.vue')
			}
		])
	}
]

const router = new VueRouter({
	routes
})

export default router
