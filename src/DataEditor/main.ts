import App from "./App.vue";
// @ts-ignore
import { createApp } from "vue";
import VxeUITable from 'vxe-table';
import 'vxe-table/lib/style.css'

createApp(App).use(VxeUITable).mount("#app");
