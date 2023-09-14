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
import { ScatterChart, EffectScatterChart } from 'echarts/charts'
import {
  TitleComponent,
  LegendComponent,
  PolarComponent,
  TooltipComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  TitleComponent,
  LegendComponent,
  PolarComponent,
  TooltipComponent,
  ScatterChart,
  CanvasRenderer,
  EffectScatterChart
])

export default {
  name: 'ChartAgeYearsAtCompany',

  components: { VChart },

  mixins: [global],

  data () {
    const data = this.$store.getters['data']

    const minAge = 18
    const ages = Array.apply(null, Array(42)).map((x, i) => i + minAge)
    const radiusAxis = {
      type: 'category',
      data: ages.map(age => 'age: ' + age),
      axisLine: {
        show: false
      },
      axisLabel: {
        fontSize: this.autoFontSize()
      }
    }

    const years = Array.apply(null, Array(25)).map((x, i) => i)
    const angleAxis = {
      type: 'category',
      data: years,
      boundaryGap: false,
      splitLine: {
        show: true
      },
      axisLine: {
        show: false
      }
    }

    const sourceAttritionYes = []
    const sourceAttritionNo = []

    let maxYearAttritionYes = { value: 0, number: 0 }
    let maxYearAttritionNo = { value: 0, number: 0 }

    for (const year of years) {
      let countDataForYearAttritionYes = 0
      let countDataForYearAttritionNo = 0

      for (const age of ages) {
        const countDataAttritionYes = data
          .filter(item => item['Age'] === age.toString() &&
            item['YearsAtCompany'] === year.toString() &&
            item['Attrition'] === 'Yes')
          .length
        countDataForYearAttritionYes += countDataAttritionYes
        sourceAttritionYes.push([
          age - minAge,
          year,
          countDataAttritionYes
        ])

        const countDataAttritionNo = data
          .filter(item => item['Age'] === age.toString() &&
            item['YearsAtCompany'] === year.toString() &&
            item['Attrition'] === 'No')
          .length
        countDataForYearAttritionNo += countDataAttritionNo
        sourceAttritionNo.push([
          age - minAge,
          year,
          countDataAttritionNo
        ])
      }

      if (countDataForYearAttritionYes > maxYearAttritionYes.value) {
        maxYearAttritionYes = { year, value: countDataForYearAttritionYes }
      }
      if (countDataForYearAttritionNo > maxYearAttritionNo.value) {
        maxYearAttritionNo = { year, value: countDataForYearAttritionNo }
      }
    }

    const option = {
      title: {
        text: 'Attrition by Age and Years at Company',
        left: 'center',
        textStyle: {
          fontSize: this.autoFontSize() * 1.2
        }
      },
      legend: {
        top: this.autoFontSize() === 10 ? '7%' : '10%',
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      polar: [{
        radius: window.innerWidth<768 ? '45%' : '65%',
        center: window.innerWidth<768 ? ['50%', '35%'] : ['25%', '60%']
      }, {
        radius: window.innerWidth<768 ? '45%' : '65%',
        center: window.innerWidth<768 ? ['50%', '80%'] : ['75%', '60%']
      }],
      angleAxis: [
        {
          ...angleAxis,
          polarIndex: 0,
          axisLabel: {
            fontSize: this.autoFontSize(),
            formatter: (value) => (value === maxYearAttritionYes.year.toString() ? '【' + value + '】' : value)
          }
        },
        {
          ...angleAxis,
          polarIndex: 1,
          axisLabel: {
            fontSize: this.autoFontSize(),
            formatter: (value) => (value === maxYearAttritionNo.year.toString() ? '【' + value + '】' : value)
          }
        }
      ],
      radiusAxis: [
        { ...radiusAxis, polarIndex: 0 },
        { ...radiusAxis, polarIndex: 1 }
      ],
      tooltip: {
        formatter: (params) => (
          'amount: ' + params.value[2] +
          ',<br/>years at company: ' + years[params.value[1]] +
          ',<br/>age: ' + ages[params.value[0]]
        ),
        textStyle: {
          fontSize: this.autoFontSize()
        }
      },
      series: [
        {
          name: 'Yes attrition',
          type: 'scatter',
          coordinateSystem: 'polar',
          symbolSize: function (val) {
            return val[2] * 2
          },
          polarIndex: 0,
          data: sourceAttritionYes,
          color: '#6e5ad7'
        },
        {
          name: 'No attrition',
          type: 'scatter',
          coordinateSystem: 'polar',
          symbolSize: function (val) {
            return val[2] * 2
          },
          polarIndex: 1,
          data: sourceAttritionNo,
          color: '#70baeb'
        }
      ]
    }

    return { option }
  }
}
</script>

<style scoped lang="scss">
body {
  .chart {
    @media (max-width: 767px) {
      height: calc(1.25 * 100vw)
    }
  }
}
</style>
