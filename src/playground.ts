import { createApp } from "vue"
import Playground from "./VacGanttPlayground.vue"
import ganttastic from "./vue-ganttastic.js"

createApp(Playground).use(ganttastic).mount("#app")
