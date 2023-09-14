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
import { BarChart } from 'echarts/charts'
import {
  TooltipComponent,
  LegendComponent,
  GridComponent,
  TitleComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  TitleComponent
])

export default {
  name: 'ChartEducationField',

  components: { VChart },

  mixins: [global],

  data () {
    const data = this.$store.getters['data']

    const yAxisName = 'EducationField'
    const xAxisNames = ['TrainingTimesLastYear', 'PercentSalaryHike']

    const categories = [...new Set(data.map(item => item[yAxisName]))]

    const sources = []
    for (let i = 0; i < categories.length; i++) {
      sources.push({
        data: [],
        category: categories[i]
      })

      for (const xAxisName of xAxisNames) {
        const dataAttritionAll = this.average(data
          .filter(item => item[yAxisName] === categories[i])
          .map(item => Number(item[xAxisName])))

        const dataAttritionYes = this.average(data
          .filter(item => item[yAxisName] === categories[i] && item['Attrition'] === 'Yes')
          .map(item => Number(item[xAxisName])))

        const dataAttritionNo = this.average(data
          .filter(item => item[yAxisName] === categories[i] && item['Attrition'] === 'No')
          .map(item => Number(item[xAxisName])))

        sources[i].data.push(Math.round((dataAttritionNo - dataAttritionYes) / dataAttritionAll * 100))
      }
    }
    sources.sort((p, n) => p.data[0] - n.data[0])

    const option = {
      title: {
        text: 'Percent difference' +
          (this.autoFontSize() === 10 ? '\n' : ' ') +
          'between Attrition by Education field',
        left: 'center',
        textStyle: {
          fontSize: this.autoFontSize() * 1.2
        }
      },
      legend: {
        top: '10%',
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      grid: {
        left: '3%',
        right: '16%',
        top: '27%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        name: 'Percent Difference (%)',
        nameTextStyle: {
          fontSize: this.autoFontSize()
        },
        axisLabel: {
          fontSize: this.autoFontSize()
        }
      },
      yAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        data: sources.map(item => item.category),
        name: yAxisName,
        nameTextStyle: {
          fontSize: this.autoFontSize()
        },
        axisLabel: {
          fontSize: this.autoFontSize()
        }
      },
      color: ['#6e5ad7', '#70baeb'],
      series: Array.apply(null, Array(2)).map((_, i) => ({
        name: xAxisNames[i],
        type: 'bar',
        label: {
          show: true,
          formatter: '{@score}%',
          position: 'inside',
          fontSize: this.autoFontSize()
        },
        emphasis: {
          focus: 'series'
        },
        data: sources.map(item => item.data[i])
      }))
    }

    return { option }
  }
}
</script>

<style scoped>

</style>
