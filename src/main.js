import Vue from 'vue';
import {
  Button, Breadcrumb, Icon, Modal, Input, Row, Col, Tooltip, InputNumber,
} from 'ant-design-vue';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import 'ant-design-vue/dist/antd.less';


Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(Button);
Vue.use(Breadcrumb);
Vue.use(Icon);
Vue.use(Modal);
Vue.use(Input);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tooltip);
Vue.use(InputNumber);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
