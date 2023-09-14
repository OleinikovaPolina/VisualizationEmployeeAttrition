<template>
  <div class="bg-light-blue">
    <b-container fluid>
      <h2 class="text-center py-3">
        HR Analytics Employee Attrition
      </h2>

      <b-row>
        <b-col
          cols="12"
          xl="6"
          class="pb-3"
        >
          <b-card>
            <chart-monthly-income-department />
          </b-card>
        </b-col>
        <b-col
          cols="12"
          xl="6"
          class="pb-3"
        >
          <b-card>
            <chart-educational-level />
          </b-card>
        </b-col>
        <b-col
          cols="12"
          xl="6"
          class="pb-3"
        >
          <b-card>
            <chart-age-years-at-company />
          </b-card>
        </b-col>
        <b-col
          cols="12"
          xl="6"
          class="pb-3"
        >
          <b-card>
            <chart-total-working-years />
          </b-card>
        </b-col>
        <b-col
          cols="12"
          xl="8"
          class="pb-3"
        >
          <b-card>
            <chart-job-role-distance-from-home />
          </b-card>
        </b-col>
        <b-col
          cols="12"
          xl="4"
          class="pb-3"
        >
          <b-card>
            <chart-over-time />
          </b-card>
        </b-col>
        <b-col
          cols="12"
          xl="8"
          class="pb-3"
        >
          <b-card>
            <chart-education-field />
          </b-card>
        </b-col>
        <b-col
          cols="12"
          xl="4"
          class="pb-3"
        >
          <b-card>
            <chart-satisfaction />
          </b-card>
        </b-col>
      </b-row>

      <div class="text-center pt-4 pb-3">
        Source of data (kaggle):
        <a
          href="https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset"
          target="_blank"
        >
          IBM HR Analytics Employee Attrition & Performance
        </a>
      </div>
    </b-container>
  </div>
</template>

<script>
import ChartEducationalLevel from '@/components/ChartEducationalLevel'
import ChartMonthlyIncomeDepartment from '@/components/ChartMonthlyIncomeDepartment'
import ChartJobRoleDistanceFromHome from '@/components/ChartJobRoleDistanceFromHome'
import ChartTotalWorkingYears from '@/components/ChartTotalWorkingYears'
import ChartOverTime from '@/components/ChartOverTime'
import ChartSatisfaction from '@/components/ChartSatisfaction'
import ChartEducationField from '@/components/ChartEducationField'
import ChartAgeYearsAtCompany from '@/components/ChartAgeYearsAtCompany'

export default {
  name: 'HomeView',
  components: {
    ChartAgeYearsAtCompany,
    ChartEducationField,
    ChartSatisfaction,
    ChartOverTime,
    ChartTotalWorkingYears,
    ChartJobRoleDistanceFromHome,
    ChartMonthlyIncomeDepartment,
    ChartEducationalLevel
  }
}
</script>
<style scoped lang="scss">
.bg-light-blue {
  background: #e8e9ed
}

.chart {
  height: 300px;
  @media (min-width: 1024px) {
    height: 380px;
  }
}

a {
  color: #6e5ad7
}
</style>
