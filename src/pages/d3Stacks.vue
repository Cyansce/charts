<template>
  <div class="d3-stack">
    <h1>d3-stacks</h1>
    <div class="left" ref="left"></div>
    <div class="right" ref="right">
      <div id="tooltip"></div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import echarts from "echarts";
import * as d3 from 'd3';
import tip from 'd3-tip';
import _ from 'lodash';
const data = [
  {
    date: '周一',
    '邮件营销': 120,
    '联盟广告': 220,
    '视频广告': 150,
    '直接访问': 320,
    '搜索引擎': 820
  },
  {
    date: '周二',
    '邮件营销': 132,
    '联盟广告': 182,
    '视频广告': 132,
    '直接访问': 332,
    '搜索引擎': 932
  },
  {
    date: '周三',
    '邮件营销': 101,
    '联盟广告': 191,
    '视频广告': 201,
    '直接访问': 301,
    '搜索引擎': 901
  },
  {
    date: '周四',
    '邮件营销': 134,
    '联盟广告': 234,
    '视频广告': 154,
    '直接访问': 334,
    '搜索引擎': 934
  },
  {
    date: '周五',
    '邮件营销': 90,
    '联盟广告': 290,
    '视频广告': 190,
    '直接访问': 390,
    '搜索引擎': 1290
  },
  {
    date: '周六',
    '邮件营销': 230,
    '联盟广告': 330,
    '视频广告': 330,
    '直接访问': 330,
    '搜索引擎': 1330
  },
  {
    date: '周日',
    '邮件营销': 210,
    '联盟广告': 310,
    '视频广告': 410,
    '直接访问': 320,
    '搜索引擎': 1320
  },
]
const margin = {
  top: 10,
  bottom: 20,
  left: 50,
  right: 50
};
const svgSize = {
  width: 800,
  height: 500
}
export default {
  name: "d3-stacks",
  mounted() {
    this.initECharts();
    this.initD3();
  },
  computed: {
    option() {
      return {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: Object.keys(data[0]).slice(1)
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: data.map(item => item.date)
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: Object.keys(data[0]).slice(1).map(item => ({
          name: item,
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: data.map(d => d[item])
        })) 
      };
    }
  },
  data: () => ({
  }),
  methods: {
    initECharts() {
      const e = echarts.init(this.$refs.left);
      e.setOption(this.option);
    },
    initD3() {
      const svg = d3.select('.right').append('svg')
        .attr('width', svgSize.width)
        .attr('height', svgSize.height)

      const xDomain = data.map(item => item.date)
      const xRange = xDomain.map((x, i) => parseInt((svgSize.width - margin.left - margin.right) / (xDomain.length - 1)) * i)

      const x = d3.scaleOrdinal()
                  .domain(xDomain)
                  .range(xRange)

      svg.append('g')
          .attr('transform', `translate(${margin.left}, ${svgSize.height - margin.bottom})`)
          .call(d3.axisBottom(x).tickValues(xDomain))

      const series = d3.stack().keys(Object.keys(data[0]).slice(1))(data)
      const y = d3.scaleLinear()
                  .domain([0, d3.max(series, d => d3.max(d, d => d[1]))])
                  .range([svgSize.height - margin.top - margin.bottom, 0])
      svg.append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
          .call(d3.axisLeft(y).ticks(5))

      // 画网格
      svg.append('g')
          .attr('class', 'y-gird')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
          .call(d3.axisRight(y).tickSize(svgSize.width - margin.left - margin.right).ticks(5))
          .selectAll('text')
          .text('')
      
      const area = d3.area()
                    .x(d => x(d.data.date))
                    .y0(d => y(d[0]))
                    .y1(d => y(d[1]))

      const colors = d3.scaleOrdinal()
                      .domain(Object.keys(data[0]).slice(1))
                      .range(d3.schemeCategory10)

      svg.append('g')
          .selectAll('path')
          .data(series)
          .join('path')
          .attr('fill', ({key}) => colors(key))
          .attr('opacity', 0.7)
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
          .attr('d', area)
      
      series.forEach(s => {
        svg.append('g')
            .selectAll('circle')
            .data(s)
            .enter()
            .append('circle')
            .attr('class', d => `circle-point ${d.data.date}`)
            .attr('r', 3)
            .attr('transform', d => `translate(${x(d.data.date) + margin.left}, ${y(d[1]) + margin.top})`)
            .attr('fill', 'white')
            .attr('stroke', d => colors(s.key))
      })

      console.log(series)


      const mouseG = svg.append('g').attr('class', 'mouse-effect')
      mouseG.append('path')
            .attr('class', 'mouse-effect-line-vertical')
            .attr('stroke', '#cccccc')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', [3, 3])
      
      mouseG.append('path')
            .attr('class', 'mouse-effect-line-horizatal')
            .attr('stroke', '#cccccc')
            .attr('stroke-width', 1)
      
      const effectRuler = d3.scaleQuantize()
                            .domain([0, svgSize.width])
                            .range(data.map(item => item.date))
      
      mouseG.append('svg:rect')
            .attr('width', svgSize.width - margin.left - margin.right)
            .attr('height', svgSize.height - margin.top - margin.bottom)
            .attr('fill', 'none')
            .attr('transform', `translate(${margin.left} ${margin.top})`)
            .attr('pointer-events', 'all')
            .on('mouseover', function() {
              d3.select('.mouse-effect-line-vertical').attr('opacity', 1)
              d3.select('.mouse-effect-line-horizatal').attr('opacity', 1)
              d3.select('#tooltip').style('visibility', 'visible')
            })
            .on('mouseout', function() {
              d3.select('.mouse-effect-line-vertical').attr('opacity', 0)
              d3.select('.mouse-effect-line-horizatal').attr('opacity', 0)
              d3.selectAll('.circle-point').attr('r', 3)
              d3.select('#tooltip').style('visibility', 'hidden')
            })
            .on('mousemove', function() {
              const [vx, vy] = d3.mouse(this)
              const date = effectRuler(vx)
              const tx = x(date)
              const lineV = d3.select('.mouse-effect-line-vertical')
              const lineH = d3.select('.mouse-effect-line-horizatal')
              lineV.attr('d', `M${margin.left} ${vy + margin.top}, ${svgSize.width - margin.left} ${vy + margin.top}`)
              lineH.transition().duration(50).attr('d', `M${tx + margin.left} ${margin.top}, ${tx + margin.left} ${svgSize.height - margin.top}`)
              d3.selectAll('.circle-point').attr('r', 3)
              d3.selectAll('.' + date).attr('r', 6)
              const tip = d3.select('#tooltip')
              const d = data.find(item => item.date === date)
              tip.style('top', `${vy + margin.top + 20}px`)
                 .style('left', `${vx + margin.left + 20}px`)
                 .html(x => {
                   let html = ``
                   for(let i in d) {
                     html += `<p>${i}: ${d[i]}</p>`
                   }
                   return html 
                 })
            })
            

    }
  }
};
</script>

<style>
.left,
.right {
  height: 500px;
}
.right {
  position: relative;
}
.d3-stack .y-gird line, .d3-stack .y-gird path {
  color: #cccccc
}
.d3-stack .right .y-gird path {
  opacity: 0;
}
.d3-stack .circle-point {
  cursor: pointer;
}
.d3-stack .circle-point:hover {
  r: 6
}
.d3-stack #tooltip {
  position: absolute;
  width: 100px;
  font-size: 12px;
  color: white;
  line-height: 12px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: #000;
  opacity: 0.6;
  top: 20px;
  left: 100px;
  padding: 0 10px;
  visibility: hidden;
}
</style>
