(function() {
    var data, el, formatPercent, height, margin, svg, width, x, xAxis, y, yAxis;
  
    data = [
      {
        "letter": "1/5",
        "frequency": ".08"
      }, {
        "letter": "2/5",
        "frequency": ".014"
      }, {
        "letter": "3/5",
        "frequency": ".027"
      }, {
        "letter": "4/5",
        "frequency": ".042"
      }, {
        "letter": "5/5",
        "frequency": ".127"
      }, {
        "letter": "6/5",
        "frequency": ".023"
      }, {
        "letter": "7/5",
        "frequency": ".02"
      }, {
        "letter": "8/5",
        "frequency": ".06"
      }, {
        "letter": "9/5",
        "frequency": ".07"
      }, {
        "letter": "10/5",
        "frequency": ".01"
      }, {
        "letter": "11/5",
        "frequency": ".03"
      }, {
        "letter": "12/5",
        "frequency": ".04"
      }, {
        "letter": "13/5",
        "frequency": ".03"
      }, {
        "letter": "14/5",
        "frequency": ".07"
      }, {
        "letter": "O",
        "frequency": ".08"
      }, {
        "letter": "P",
        "frequency": ".02"
      }, {
        "letter": "Q",
        "frequency": ".0"
      }, {
        "letter": "R",
        "frequency": ".06"
      }, {
        "letter": "S",
        "frequency": ".06"
      }, {
        "letter": "T",
        "frequency": ".09"
      }, {
        "letter": "U",
        "frequency": ".03"
      }, {
        "letter": "V",
        "frequency": ".01"
      }, {
        "letter": "W",
        "frequency": ".03"
      }, {
        "letter": "X",
        "frequency": ".02"
      },
    ];
  
    el = d3.select('.chart-bar');
  
    formatPercent = d3.format('%');
  
    margin = {
      top: 0,
      right: 0,
      bottom: 30,
      left: 50
    };
  
    width = el[0][0].offsetWidth - margin.left - margin.right;
  
    height = width * .6 - margin.top - margin.bottom;
  
    x = d3.scale.ordinal().domain(data.map(function(d) {
      return d.letter;
    })).rangeRoundBands([0, width*2], .1);
    //adjust width of bars
  
    y = d3.scale.linear().domain([
      0, d3.max(data, function(d) {
        return d.frequency;
      })
    ]).range([height, 0]);
  
    xAxis = d3.svg.axis().scale(x).orient('bottom');
  
    yAxis = d3.svg.axis().scale(y).orient('left').tickFormat(formatPercent);
  
  svg = el.append('svg').attr('height', height + margin.top + margin.bottom).attr('width', width + margin.left + margin.right).append('g').attr('transform', "translate(" + margin.left + ", " + margin.top + ")");
  
  svg.append('g').attr('class', 'axis x').attr('transform', "translate(0, " + height + ")").call(xAxis);
    
  svg.append('g').attr('class', 'axis y').call(yAxis);
  
  svg.selectAll('.bar')
  .data(data).enter().append('rect').attr('class', 'bar')
  .attr("fill", function(d){
        if (d.frequency > 0.08){
          return "#ff666f";
        } else if (d.frequency <= 0.05){
          return "#6f5df6";
        } else if (d.frequency <= 0.08){
          return "#46b9b9";
        }
        })
  .attr('x', function(d) {
      return x(d.letter);
    })
  .attr('y', height).attr('height', 0)
  .attr('width', x.rangeBand())
  .transition().duration(1500)
  .ease('elastic')
  .delay(function(d, i) {
      return i * 35;
    })
  .attr('y', function(d) {
      return y(d.frequency);
    })
  .attr('height', function(d) {
      return height - y(d.frequency);
    })
  
  }).call(this);