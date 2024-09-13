<script lang="ts" setup>
import { computed, ref } from "vue"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
import GGanttChart from "./components/GGanttChart.vue"
import GGanttRow from "./components/GGanttRow.vue"
import type { GanttBarObject } from "./types"
import weekday from "dayjs/plugin/weekday"

dayjs.extend(weekday)
dayjs.extend(customParseFormat)

const chartStart = dayjs().startOf("day").format("YYYY-MM-DD HH:mm")
const chartEnd = "2026-07-14 00:00"
const grid = ref(true)
const hideTimeAxis = ref(false)
const currentTime = ref(true)
const dark = ref(true)

const generateRows = (rowCount: number) => {
  const rows: { title: string; bars: GanttBarObject[] }[] = []
  const maxDate = dayjs("2026-12-31T00:00:00")

  for (let i = 0; i < rowCount; i++) {
    const bars: GanttBarObject[] = []
    let previousEndDate = dayjs()

    while (previousEndDate < maxDate) {
      const beginDateTime = previousEndDate.add(Math.floor(Math.random() * 3), "day").startOf("day")
      const endDateTime = beginDateTime.add(Math.floor(Math.random() * 9) + 2, "day").startOf("day")
      if (endDateTime > maxDate) break

      bars.push({
        beginDate: beginDateTime.format("yyyy-LL-dd HH:mm"),
        endDate: endDateTime.format("yyyy-LL-dd HH:mm"),
        ganttBarConfig: {
          id: `${i}-${bars.length}-${Date.now()}`,
          hasHandles: true,
          label: "Maximilian",
          style: {
            background: "#" + Math.floor(Math.random() * 16777215).toString(16),
            borderRadius: "20px",
            color: "black"
          }
        }
      })

      previousEndDate = endDateTime
    }

    rows.push({
      title: `App. ${i + 1}`,
      bars
    })
  }

  return rows
}

const getHighlightedUnits = computed(() => {
  const start = dayjs().startOf("day")
  const end = dayjs(chartEnd, "YYYY-MM-DD HH:mm")

  const highlightedUnits: number[] = []
  let current = start
  let index = 0

  while (current <= end) {
    if (current.weekday() === 6 || current.weekday() === 7) highlightedUnits.push(index)
    current = current.add(1, "day")
    index++
  }
  return highlightedUnits
})
console.log("this is getHighlightedUnits fixture: ", getHighlightedUnits.value)
const ganttRows = computed(() => generateRows(10))
console.log("this is ganttRows fixture: ", ganttRows.value)
</script>

<template>
  <div id="vertical-scroll-wrapper">
    <g-gantt-chart
      label-column-sticky
      timeaxis-sticky
      :chart-end="chartEnd"
      :chart-start="chartStart"
      :color-scheme="dark ? 'dark' : 'default'"
      :current-time="currentTime"
      :grid="grid"
      :hide-timeaxis="hideTimeAxis"
      :highlight-current-time="true"
      :highlighted-units="[0, 1, 6, 7, 13, 14]"
      :row-height="35"
      bar-end="endDate"
      bar-start="beginDate"
      label-column-title="Unit"
      label-column-width="75px"
      precision="day"
    >
      <template #upper-timeunit="{ date: upperDate }">
        <div>
          <span>{{ dayjs(upperDate).format("MMMM YYYY") }}</span>
        </div>
      </template>
      <template #timeunit="{ date: unitDate }">
        <div style="width: 35px; text-align: center">
          <span>{{ unitDate.getDate() }}</span>
        </div>
      </template>
      <g-gantt-row
        v-for="(row, rowIndex) in ganttRows"
        :key="`row-${rowIndex}`"
        :bars="row.bars"
        :label="row.title"
        highlight-on-hover
      />
    </g-gantt-chart>
  </div>
</template>

<style>
#vertical-scroll-wrapper {
  width: 100%;
  max-height: 300px;
  display: flex;
  overflow-x: scroll;
}
</style>
