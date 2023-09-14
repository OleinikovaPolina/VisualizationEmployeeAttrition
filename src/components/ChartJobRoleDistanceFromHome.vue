<template>
  <v-chart
    class="chart"
    :option="option"
    autoresize
  />
</template>

<script>
import global from '../mixins/global'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { BoxplotChart, ScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  DatasetComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  BoxplotChart,
  ScatterChart,
  CanvasRenderer
])

export default {
  name: 'ChartJobRoleDistanceFromHome',

  components: { VChart },

  mixins: [global],

  data () {
    const data = this.$store.getters['data']

    const roles = [
      'Human Resources',
      'Healthcare Representative',
      'Sales Executive',
      'Research Scientist',
      'Manufacturing Director',
      'Laboratory Technician',
      'Sales Representative',
      'Research Director',
      'Manager'
    ]

    let sourcesBoxplot = [[], []]
    let sourceLine = []
    for (const role of roles) {
      const dataAttritionYes = data
        .filter(item => item['JobRole'] === role && item['Attrition'] === 'Yes')
        .map(item => Number(item['DistanceFromHome']))
      const dataAttritionNo = data
        .filter(item => item['JobRole'] === role && item['Attrition'] === 'No')
        .map(item => Number(item['DistanceFromHome']))

      sourcesBoxplot[0].push(dataAttritionYes)
      sourcesBoxplot[1].push(dataAttritionNo)
      sourceLine.push((this.median(dataAttritionYes) / this.median(dataAttritionNo)).toFixed(2))
    }

    const datasetSource = sourcesBoxplot.map(source => ({ source: source }))
    const datasetTransform = Array.apply(null, Array(datasetSource.length)).map((_, i) => ({
      fromDatasetIndex: i,
      transform: {
        type: 'boxplot',
        config: { itemNameFormatter: ({ value }) => roles[value] }
      }
    }))

    const option = {
      title: {
        text: 'Attrition by Distance from Home and Job role',
        left: 'center',
        textStyle: {
          fontSize: this.autoFontSize() * 1.2
        }
      },
      dataset: [
        ...datasetSource,
        ...datasetTransform
      ],
      legend: {
        top: this.autoFontSize() === 10 ? '7%' : '10%',
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params) => this.formatterTooltipBoxplot(params, 'miles'),
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      grid: {
        left: '3%',
        right: '3%',
        top: '25%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: roles,
        splitLine: {
          show: true
        },
        axisLabel: {
          fontSize: this.autoFontSize() * 0.9,
          rotate: this.autoFontSize() === 10 ? 45 : 30
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Distance from home',
          splitNumber: 3,
          axisLabel: {
            fontSize: this.autoFontSize(),
            formatter: '{value} miles'
          },
          nameTextStyle: {
            fontSize: this.autoFontSize()
          }
        },
        {
          type: 'value',
          name: 'Yes / No',
          splitNumber: 2,
          splitLine: {
            show: false
          },
          axisLabel: {
            fontSize: this.autoFontSize()
          },
          nameTextStyle: {
            fontSize: this.autoFontSize()
          }
        }
      ],
      series: [
        {
          name: 'Yes attrition',
          type: 'boxplot',
          datasetIndex: 2,
          color: '#6e5ad7'
        }, {
          name: 'No attrition',
          type: 'boxplot',
          datasetIndex: 3,
          color: '#70baeb'
        },
        {
          name: 'Yes / No',
          type: 'line',
          yAxisIndex: 1,
          data: sourceLine,
          color: '#d259ed'
        }
      ]
    }

    return { option }
  }
}
</script>

<style scoped>

</style>
