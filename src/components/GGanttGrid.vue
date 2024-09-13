<template>
  <div class="g-grid-container">
    <div
      v-for="{ label, value, width } in timeaxisUnits.lowerUnits"
      :key="label"
      class="g-grid-line"
      :style="{
        width,
        background: Number(value) === 10 ? colors.hoverHighlight : ''
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import provideConfig from "../provider/provideConfig.js"
import useTimeaxisUnits from "../composables/useTimeaxisUnits.js"

const props = defineProps<{
  highlightedUnits?: number[]
}>()

const chu = computed(() => props.highlightedUnits || [])
console.log("this is highlightedUnits:", props.highlightedUnits)

const { colors } = provideConfig()
console.log("this is colors.hoverHighlight:", colors.value.hoverHighlight)
const { timeaxisUnits } = useTimeaxisUnits()
</script>

<style>
.g-grid-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.g-grid-line {
  width: 1px;
  height: 100%;
  border-left: 1px solid #eaeaea;
}
</style>
