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
import { BoxplotChart } from 'echarts/charts'
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
  CanvasRenderer
])

export default {
  name: 'ChartMonthlyIncomeDepartment',

  components: { VChart },

  mixins: [global],

  data () {
    const data = this.$store.getters['data']

    const departments = ['Human Resources', 'Research & Development', 'Sales']

    let sources = [[], [], []]
    for (const department of departments) {
      const dataAttritionYes = data
        .filter(item => item['Department'] === department && item['Attrition'] === 'Yes')
        .map(item => Number(item['MonthlyIncome']))

      const dataAttritionNo = data
        .filter(item => item['Department'] === department && item['Attrition'] === 'No')
        .map(item => Number(item['MonthlyIncome']))

      sources[0].push(dataAttritionYes)
      sources[1].push(dataAttritionNo)
      sources[2].push((this.median(dataAttritionYes) / this.median(dataAttritionNo)).toFixed(2))
    }

    const option = {
      title: {
        text: 'Attrition by Monthly Income and Departments',
        left: 'center',
        textStyle: {
          fontSize: this.autoFontSize() * 1.2
        }
      },
      dataset: [
        {
          source: sources[0]
        },
        {
          source: sources[1]
        },
        {
          fromDatasetIndex: 0,
          transform: {
            type: 'boxplot',
            config: { itemNameFormatter: ({ value }) => departments[value] }
          }
        },
        {
          fromDatasetIndex: 1,
          transform: {
            type: 'boxplot',
            config: { itemNameFormatter: ({ value }) => departments[value] }
          }
        }
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
        formatter: (params) => this.formatterTooltipBoxplot(params, '$'),
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
        data: departments,
        splitLine: {
          show: true
        },
        axisLabel: {
          fontSize: this.autoFontSize(),
          interval: 0,
          rotate: this.autoFontSize() === 10 ? 15 : 0
        }
      },
      yAxis: [
        {
          type: 'value',
          name: 'Monthly income',
          splitNumber: 2,
          nameTextStyle: {
            fontSize: this.autoFontSize()
          },
          axisLabel: {
            fontSize: this.autoFontSize(),
            formatter: '{value} $'
          }
        },
        {
          type: 'value',
          name: 'Yes / No',
          splitNumber: 2,
          nameTextStyle: {
            fontSize: this.autoFontSize()
          },
          axisLabel: {
            fontSize: this.autoFontSize()
          },
          splitLine: {
            show: false
          }
        }
      ],
      series: [
        {
          name: 'Yes attrition',
          type: 'boxplot',
          datasetIndex: 2,
          color: '#6e5ad7'
        },
        {
          name: 'No attrition',
          type: 'boxplot',
          datasetIndex: 3,
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
