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
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  BarChart,
  CanvasRenderer
])

export default {
  name: 'ChartEducationalLevel',

  components: { VChart },

  mixins: [global],

  data () {
    const data = this.$store.getters['data']

    const education = ['Below College', 'College', 'Bachelor', 'Master', 'Doctor']

    const sources = [[], [], []]
    for (let i = 1; i <= education.length; i++) {
      const dataAttritionYes = data
        .filter(item => item['Attrition'] === 'Yes' && item['Education'] === i.toString())
        .length
      const dataAttritionNo = data
        .filter(item => item['Attrition'] === 'No' && item['Education'] === i.toString())
        .length

      sources[0].push(dataAttritionYes)
      sources[1].push(dataAttritionNo)
      sources[2].push((dataAttritionYes / dataAttritionNo).toFixed(2))
    }

    const option = {
      title: {
        text: 'Attrition by Educational Level',
        left: 'center',
        textStyle: {
          fontSize: this.autoFontSize() * 1.2
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
      legend: {
        top: this.autoFontSize() === 10 ? '7%' : '10%',
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
      yAxis: [
        {
          type: 'value',
          name: 'Amount',
          nameTextStyle: {
            fontSize: this.autoFontSize()
          },
          axisLabel: {
            fontSize: this.autoFontSize()
          }
        },
        {
          type: 'value',
          name: 'Yes / No',
          splitLine: {
            show: false
          },
          nameTextStyle: {
            fontSize: this.autoFontSize()
          },
          axisLabel: {
            fontSize: this.autoFontSize()
          }
        }
      ],
      xAxis: [{
        type: 'category',
        data: education,
        splitLine: {
          show: true
        },
        axisLabel: {
          interval: 0,
          fontSize: this.autoFontSize()
        }
      }],
      series: [
        {
          name: 'Yes attrition',
          type: 'bar',
          data: sources[0],
          color: '#6e5ad7'
        },
        {
          name: 'No attrition',
          type: 'bar',
          data: sources[1],
          color: '#70baeb'
        },
        {
          name: 'Yes / No',
          type: 'line',
          yAxisIndex: 1,
          data: sources[2],
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
