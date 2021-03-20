import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import useFirebaseAuth from "../hooks/firebase-auth";

const state = useFirebaseAuth();
const routes: Array<RouteRecordRaw> = [
	{
		path: "/",
		redirect: '/home'
	},
	{
		path: "/login",
		name: "login",
		component: () => import("@/views/LoginPage.vue"),
	},
	{
		path: "/home",
		name: "HomePage",
		component: () => import("@/views/HomePage.vue"),
	},
	{
		path: "/loadData",
		name: "LoadDataPage",
		component: () => import("@/views/LoadDataPage.vue"),
	},
	{
		path: "/statistics",
		name: "StatisticsPage",
		component: () => import("@/views/StatisticsPage.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

// If there are no info about user, there is a redirect to login page
router.beforeEach((to, from, next) => {
	// console.log(state.user.value)
	if (state.user.value && (to.name === 'login')) {
		next({ name: 'home', replace: true })
	} else if (!state.user.value && (to.name !== 'login')) {
		next({ name: 'login', replace: true })
	} else {
		next();
	}
});

export default router
