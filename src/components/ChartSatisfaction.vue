<template>
  <v-chart
    class="chart"
    :option="option"
    autoresize
  />
</template>

<script>
import VChart from 'vue-echarts'
import global from '../mixins/global'
import { use } from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import {
  TitleComponent,
  LegendComponent,
  TooltipComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  LegendComponent,
  RadarChart,
  CanvasRenderer,
  TooltipComponent
])

export default {
  name: 'ChartSatisfaction',

  components: { VChart },

  mixins: [global],

  data () {
    const data = this.$store.getters['data']

    const indicators = [
      'EnvironmentSatisfaction',
      'RelationshipSatisfaction',
      'JobSatisfaction'
    ]

    const sources = [[], []]
    for (const indicator of indicators) {
      sources[0].push(
        this.average(data
          .filter(item => item['Attrition'] === 'Yes')
          .map(item => Number(item[indicator])))
          .toFixed(2)
      )
      sources[1].push(
        this.average(data
          .filter(item => item['Attrition'] === 'No')
          .map(item => Number(item[indicator])))
          .toFixed(2)
      )
    }

    const option = {
      title: {
        text: 'Attrition by Satisfaction',
        left: 'center',
        textStyle: {
          fontSize: this.autoFontSize() * 1.2
        }
      },
      tooltip: {
        trigger: 'axis',
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      legend: {
        top: this.autoFontSize() === 10 ? '7%' : '10%',
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      radar: {
        shape: 'polygon',
        center: ['50%', '65%'],
        radius: '70%',
        axisName: {
          fontSize: this.autoFontSize()
        },
        indicator: [
          { name: 'Environment\nSatisfaction', min: 1, max: 4 },
          { name: 'Relationship\nSatisfaction', min: 1, max: 4 },
          { name: 'Job\nSatisfaction', min: 1, max: 4 }
        ]
      },
      series: [
        {
          type: 'radar',
          tooltip: {
            trigger: 'item'
          },
          color: ['#6e5ad7', '#70baeb'],
          data: [
            {
              value: sources[0],
              name: 'Yes attrition'
            },
            {
              value: sources[1],
              name: 'No attrition'
            }
          ]
        }
      ]
    }

    return { option }
  }
}
</script>

<style scoped>

</style>
