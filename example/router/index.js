import Vue from 'vue';
import VueRouter from 'vue-router';
import RouteGenerate from '../../src';
import defaultLayout from '@/components/defaultLayout';
import notFoundPage from '@/components/notFoundPage';

Vue.use(VueRouter)

let generator = new RouteGenerate(require.context('../views', true, /\.vue$/))
generator.setDefaultLayout(defaultLayout);
generator.setNotFoundPage(notFoundPage);

const routes = generator.generate();

const router = new VueRouter({
    routes,
});

export default router;
