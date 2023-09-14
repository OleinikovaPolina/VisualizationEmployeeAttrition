<template>
  <div
    v-if="axis"
    class="tooltip-boxplot"
  >
    <div class="pb-2">
      {{ axis[0].name }}
    </div>
    <b-row class="d-flex">
      <b-col
        v-for="i in [0,1]"
        :key="i"
        cols="12"
        lg="6"
        class="pb-2"
      >
        <!-- eslint-disable vue/no-v-html -->
        <div class="d-flex justify-content-between">
          <div>
            <span v-html="axis[i].marker" />
            {{ axis[i].seriesName }} ({{ unit }})
          </div>
          <b class="small pl-2 d-lg-none">{{ Math.round(axis[i].value[3]) }}</b>
        </div>
        <div
          v-for="(value,j) in values"
          :key="i+value"
          class="d-none d-lg-flex justify-content-between small"
          style="line-height: 1.2"
        >
          {{ value }} <b class="pl-2">{{ Math.round(axis[i].value[j + 1]) }}</b>
        </div>
      </b-col>
    </b-row>
    <div class="d-flex justify-content-between">
      <div>
        <span v-html="axis[2].marker" />
        {{ axis[2].seriesName }}
      </div>
      <b class="small pl-2">{{ axis[2].value }}</b>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TooltipBoxplot',
  props: {
    axis: {
      type: Array,
      default: () => []
    },
    unit: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    values: ['min', 'Q1', 'median', 'Q3', 'max']
  })
}
</script>

<style scoped lang="scss">
.tooltip-boxplot {
  @media (max-width: 1023px) {
    width: min-content
  }
}
</style>
