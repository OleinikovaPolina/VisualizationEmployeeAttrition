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
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  MarkPointComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  MarkPointComponent
])

export default {
  name: 'ChartTotalWorkingYears',

  components: { VChart },

  mixins: [global],

  data () {
    const data = this.$store.getters['data']

    const years = Array.apply(null, Array(40)).map((x, i) => i)

    const sourceAttritionNo = []
    const sourceAttritionYes = []
    const sourceDiff = []

    for (let i = 0; i < years.length; i++) {
      const dataAttritionYes = data
        .filter(item => item['Attrition'] === 'Yes' && item['TotalWorkingYears'] === i.toString())
        .length
      const dataAttritionNo = data
        .filter(item => item['Attrition'] === 'No' && item['TotalWorkingYears'] === i.toString())
        .length

      sourceAttritionNo.push(dataAttritionNo)
      sourceAttritionYes.push(dataAttritionYes)
      sourceDiff.push(dataAttritionNo ? Number((dataAttritionYes / dataAttritionNo).toFixed(2)) : 0)
    }

    const option = {
      title: {
        text: 'Attrition by Total Working Years',
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
      grid: {
        left: '3%',
        right: '6%',
        top: '25%',
        bottom: '3%',
        containLabel: true
      },
      legend: {
        top: this.autoFontSize() === 10 ? '7%' : '10%',
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      xAxis: {
        type: 'category',
        data: years,
        name: 'Years',
        nameGap: 20,
        axisTick: { show: false },
        nameTextStyle: {
          fontSize: this.autoFontSize()
        },
        axisLabel: {
          fontSize: this.autoFontSize()
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Amount',
          splitNumber: 4,
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
          splitNumber: 3,
          nameTextStyle: {
            fontSize: this.autoFontSize()
          },
          axisLabel: {
            fontSize: this.autoFontSize()
          }
        }
      ],
      series: [
        {
          name: 'Yes attrition',
          type: 'line',
          symbol: 'none',
          data: sourceAttritionYes,
          smooth: true,
          areaStyle: {},
          markPoint: {
            data: [{
              name: 'Max',
              value: Math.max(...sourceAttritionYes),
              xAxis: sourceAttritionYes.indexOf(Math.max(...sourceAttritionYes)),
              yAxis: Math.max(...sourceAttritionYes)
            }],
            symbolSize: this.autoFontSize() === 10 ? 35 : 50,
            label: {
              fontSize: this.autoFontSize()
            }
          },
          color: '#6e5ad7'
        },
        {
          name: 'No attrition',
          type: 'line',
          symbol: 'none',
          data: sourceAttritionNo,
          smooth: true,
          areaStyle: {},
          markPoint: {
            data: [{
              name: 'Max',
              value: Math.max(...sourceAttritionNo),
              xAxis: sourceAttritionNo.indexOf(Math.max(...sourceAttritionNo)),
              yAxis: Math.max(...sourceAttritionNo)
            }],
            symbolSize: this.autoFontSize() === 10 ? 35 : 50,
            label: {
              fontSize: this.autoFontSize()
            }
          },
          color: '#70baeb'
        },
        {
          name: 'Yes / No',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          showSymbol: false,
          data: sourceDiff,
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
