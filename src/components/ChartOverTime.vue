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
import { PieChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer
])

export default {
  name: 'ChartOverTime',

  components: { VChart },

  mixins: [global],

  data () {
    const data = this.$store.getters['data']

    const arrayYesNo = ['Yes', 'No']

    const sourceAttrition = []
    for (const attrition of arrayYesNo) {
      sourceAttrition.push({
        value: data.filter(item => item['Attrition'] === attrition).length,
        name: attrition + ' attrition'
      })
    }

    const sourceOverTime = []
    for (const attrition of arrayYesNo) {
      for (const overTime of arrayYesNo) {
        sourceOverTime.push({
          value: data
            .filter(item => item['Attrition'] === attrition && item['OverTime'] === overTime)
            .length,
          name: overTime + ' Overtime'
        })
      }
    }

    const option = {
      title: {
        text: 'Attrition by Overtime',
        left: 'center',
        textStyle: {
          fontSize: this.autoFontSize() * 1.2
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
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
      series: [
        {
          name: 'Attrition',
          type: 'pie',
          radius: [0, '35%'],
          center: ['50%', '65%'],
          label: {
            fontSize: this.autoFontSize(),
            position: 'inner'
          },
          labelLine: {
            show: false
          },
          color: ['#6e5ad7', '#70baeb'],
          data: sourceAttrition
        },
        {
          name: 'Overtime',
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['50%', '65%'],
          labelLine: {
            length: 14
          },
          label: {
            formatter: '{b|{b}}\n{per|{d}%}  ',
            rich: {
              b: {
                fontSize: this.autoFontSize(),
                lineHeight: this.autoFontSize()*1.5
              },
              per: {
                fontSize: this.autoFontSize(),
                fontWeight: 'bold',
                padding: [3, 4],
                borderRadius: 4
              }
            }
          },
          color: ['#d259ed', '#55d9ed'],
          data: sourceOverTime
        }
      ]
    }

    return { option }
  }
}
</script>

<style scoped>

</style>
