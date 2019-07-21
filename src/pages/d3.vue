<template>
  <div class="content">
    <div class="left" ref="echarts"></div>
    <div class="right" ref="d3"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import * as d3 from "d3";
const dataset =[820, 932, 901, 934, 1290, 1330, 1320]
const datasetX = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
export default {
  name: "d3-demo",
  mounted() {
    this.initEcharts();
    this.initD3();
  },
  data: () => ({
    e: {},
    d: {},
    e_options: {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: dataset,
          type: "line"
        }
      ]
    },
    d_options: {
      width: "100%",
      height: "500px"
    }
  }),
  methods: {
    initEcharts() {
      this.e = echarts.init(this.$refs.echarts);
      this.e.setOption(this.e_options);
    },
    initD3() {
      const svg = d3.select(".right")
        .append("svg")
        .attr("width", this.d_options.width)
        .attr("height", this.d_options.height)

      const linearY = d3.scaleLinear()
                      .domain([0, 1500])
                      .range([400, 0])

      const linearX = d3.scaleOrdinal()
                        .domain(datasetX)
                        .range([0, 70, 140, 210, 280, 350, 420])                      
      
      const yAxis = d3.axisLeft(linearY)
                    .tickValues([0, 300, 600, 900, 1200, 1500])
      
      const xAxis = d3.axisBottom(linearX)
                      .tickValues(datasetX)

      svg.append('g')
        .attr('class', 'd-yAxis')
        .attr('transform', 'translate(100, 50)')
        .call(yAxis)
      
      svg.append('g')
          .attr('class', 'd-xAxis')
          .attr('transform', 'translate(100, 450)')
          .call(xAxis)

      const linePath = d3.line()
                          .x((d, i) => { return linearX(datasetX[i]) })
                          .y(d => { return linearY(d) })
      
      svg.append('g')
          .append('path')
          .attr('d', linePath(dataset))
          .attr('stroke', '#c23531')
          .attr('stroke-width', 3)
          .attr('fill', 'none')
          .attr('transform', 'translate(100, 50)')
      
      svg.append('g').selectAll('circle').data(dataset)
          .enter()
          .append('circle')
          .attr('transform', (d, i) => {
            return `translate(${linearX(datasetX[i]) + 100}, ${linearY(d) + 50})`
          })
          // .transition()
          // .duration(1000)
          .attr('r', 3)
          .attr('stroke', 'red')
          .attr('fill', 'white')
          .style('cursor', 'pointer')
          .on('mouseover', function() {
            d3.select(this).transition().attr('r', 6)
          })
          .on('mouseout', function() {
            d3.select(this).transition().attr('r', 3)
          })
          .append('title')
          .text((d, i) => { return `${datasetX[i]},${d}`})
      
      svg.append('g')
          .append('rect')
          .attr('width', '100%')
          .attr('height', '400px')
          .attr('transform', 'translate(100, 50)')
          .attr('fill', 'white')
          .transition()          
          .duration(3000)
          .ease(d3.easePolyOut)
          .attr('transform', 'translate(600, 50)')
    }
  }
};
</script>

<style scoped>
.left,
.right {
  width: 50%;
  height: 500px;
}
.d-yAxis {
  margin-left: 100px;
}

</style>

