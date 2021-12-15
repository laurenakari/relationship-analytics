const movieData = [
    { name: "iMessage", value: 49 },
    { name: "Facebook", value: 11 },
    { name: "WhatsApp", value: 13 },
    { name: "G-Chat", value: 10 },
    { name: "Instagram", value: 10 },
    { name: "Call", value: 6 },
    { name: "Slack", value: 6 },
    { name: "Video", value: 4 },
    { name: "Email", value: 3 },
    { name: "Line", value: 2 },
    { name: "Image Sharing", value: 2 },
  ];
  bakeDonut(movieData);
  
  function bakeDonut(d) {
    let activeSegment;
    const data = d.sort((a, b) => b["value"] - a["value"]),
      viewWidth = 1000,
      viewHeight = 423,
      svgWidth = viewHeight,
      svgHeight = viewHeight,
      thickness = 70,
      el = d3.select(".donut-chart"),
      radius = Math.min(svgWidth, svgHeight) / 2,
      color = d3
        .scaleOrdinal()
        .range([
          "#005f73",
          "#0a9396",
          "#94d2bd",
          "#e9d8a6",
          "#dbc170",
          "#cca633",
          "#ee9b00",
          "#ca6702",
          "#bb3e03",
          "#ae2012",
          "#8a190f",
          "#61051c",
        ]);
  
    const max = d3.max(data, maxData => maxData.value);
  
    const arc = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius);
  
    const arcHover = d3
      .arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius + 20);
  
    const pie = d3
      .pie()
      .value(function(pieData) {
        return pieData.value;
      })
      .sort(null);
  
    // Selecting the div with class "graph" and creating the svg
    const svg = el
      .append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("viewBox", `0 0 ${viewWidth + thickness} ${viewHeight + thickness}`)
      .attr("class", "pie")
      .attr("width", viewWidth)
      .attr("height", viewHeight);
  
    // append 'g' element to the svg element
    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate( ${svgWidth / 2 + thickness / 2}, ${svgHeight / 2 +
          thickness / 2})`
      );
  
    // Creating the donut chart
    const path = g
      .selectAll("path")
      .attr("class", "data-path")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "slice")
      .attr("role", "listitem")
      .attr("class", "data-group")
      .style("fill", "white")
      .each(function(pathData, i) {
        const group = d3.select(this);
  
        group
          .append("text")
          .text(`${pathData.data.value}%`)
          .attr("class", "donut-text donut-text-hours")
          .attr("text-anchor", "middle")
  
        group
          .append("text")
          .text(`${pathData.data.name}`)
          .attr("class", "donut-text donut-text-category")
          .attr("text-anchor", "middle")
          .style("fill", "white")
          .attr("dy", "2rem");
        
  
        // Set default active segment
        if (pathData.value === max) {
          const textVal = d3
            .select(this)
            .select(".donut-text-hours")
            .classed("donut-text--show", true);
  
          const textName = d3
            .select(this)
            .select(".donut-text-category")
            .classed("donut-text--show", true);
        }
      })
      .append("path")
      .attr("d", arc)
      .attr("aria-label", function(d, i) {
        return d.data.category + " require " + d.data.value + " " + "Hours";
      })
      .attr("focusable", "true")
      .attr("tabindex", "0")
      .attr("fill", (fillData, i) => color(fillData.data.name))
      .attr("class", "data-path")
      .on("mouseover", function() {
        const _thisPath = this,
          parentNode = _thisPath.parentNode;
  
        if (_thisPath !== activeSegment) {
          activeSegment = _thisPath;
  
          const dataTexts = d3
            .selectAll(".donut-text")
            .classed("donut-text--show", false);
  
          const paths = d3
            .selectAll(".data-path")
            .transition()
            .duration(250)
            .attr("d", arc);
  
          d3
            .select(_thisPath)
            .transition()
            .duration(250)
            .attr("d", arcHover);
  
          const thisDataValue = d3
            .select(parentNode)
            .select(".donut-text-hours")
            .classed("donut-text--show", true);
          const thisDataText = d3
            .select(parentNode)
            .select(".donut-text-category")
            .classed("donut-text--show", true);
        }
      })
      .each(function(v, i) {
        if (v.value === max) {
          const maxArc = d3.select(this).attr("d", arcHover);
          activeSegment = this;
        }
        this._current = i;
      });
  
    //legend
    const legendRectSize = 18;
    const legendSpacing = 13;
  
    const legend = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", function(legendData, i) {
        const itemHeight = legendRectSize + legendSpacing;
        const offset = legendRectSize * color.domain().length;
        const horz = svgWidth + 150;
        const vert = i * itemHeight + legendRectSize + (svgHeight - offset) / 2.2;
        return `translate(${horz}, ${vert})`;
      });
  
    legend
      .append("circle")
      .attr("r", legendRectSize / 2)
      .style("fill", color);
  
    legend
      .append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr("y", legendRectSize - legendSpacing)
      .attr("class", "legend-text")
      .text(legendData => legendData)
      .style("fill", "white");
  }
  