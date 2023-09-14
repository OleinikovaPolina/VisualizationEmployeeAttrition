import Vue from 'vue'
import TooltipBoxplot from '@/components/TooltipBoxplot'

export default {
  methods: {
    average (array) {
      const sum = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const length = array.length
      return sum / length
    },

    median (array) {
      array.sort((a, b) => a - b)
      const mid = array.length / 2
      return mid % 1 ? array[mid - 0.5] : (array[mid - 1] + array[mid]) / 2
    },

    formatterTooltipBoxplot (axis, unit) {
      const TooltipBoxplotClass = Vue.extend(TooltipBoxplot)
      const TooltipBoxplotInstance = new TooltipBoxplotClass({
        propsData: { axis, unit }
      })
      return TooltipBoxplotInstance.$mount().$el
    },

    autoFontSize () {
      if (window.innerWidth >= 768) {
        return 12
      }
      return 10
    }
  }
}
