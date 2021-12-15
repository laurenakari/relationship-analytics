var   w = 1000,
      h =  700,
      circleWidth = 3; 
 

var palette = {
      "lightgray": "#E5E8E8",
      "gray": "#708284",
      "mediumgray": "#536870",
      "blue": "#FFFFFF"
  }

var colors = d3.scale.category20();

var nodes = [
      { name: "You", value: 50, img:"img/you.png"},
      { name: "Lewis", target: [0], value: 50, img:"img/friend-1.png"},
      { name: "David", target: [0], value: 50, img:"img/friend-2.png"},  
      { name: "Katherine", target: [0], value: 50, img:"img/friend-3.png"},
      { name: "Mariah", target: [0], value: 50, img:"img/friend-4.png"}, 
      { name: "Aimee", target: [0], value: 50, img:"img/friend-5.png"}, 
      { name: "Aarushi", target: [0], value: 50, img:"img/friend-6.png"},
      { name: "Steven", target: [0], value: 50, img:"img/friend-7.png"},
      { name: "Aaron", target: [0], value: 50, img:"img/friend-8.png"},
      { name: "Marco", target: [0], value: 50, img:"img/friend-9.png"},
      { name: "Aja", target: [0], value: 50, img:"img/friend-10.png"},
];

var links = [];

for (var i = 0; i < nodes.length; i++){
      if (nodes[i].target !== undefined) { 
            for ( var x = 0; x < nodes[i].target.length; x++ ) 
              links.push({
                  source: nodes[i],
                  target: nodes[nodes[i].target[x]]  
              });
      };
};


var myChart = d3.select('body')
      .append("div")
        .classed("svg-container", true)
      
      .append('svg')
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 1000 800")
        .classed("svg-content-responsive", true)


var force = d3.layout.force()
      .nodes(nodes)
      .links([])
      .gravity(0.1)
      .charge(-1000)
      .size([w,h]); 

      var link = myChart.selectAll('line') 
            .data(links).enter().append('line')
            .attr('stroke', palette.lightgray)
            .attr('strokewidth', '1');

      var node =  myChart.selectAll('circle')  
            .data(nodes).enter() 
            .append('g') 
            .call(force.drag);
     
     node.append('circle')
            .attr('cx', function(d){return d.x; })
            .attr('cy', function(d){return d.y; })
            .attr('r', function(d,i){
                  console.log(d.value);
                  if ( i > 0 ) {
                        return circleWidth + d.value; 
                  } else {
                        return circleWidth + 35; 
                  }
            })
            .attr('fill', "none")
            .attr('strokewidth', function(d,i){
                  if ( i > 0 ) {
                        return '0';
                  } else {
                        return '2';
                  }
            })

      force.on('tick', function(e){ 
            node.attr('transform', function(d, i){
              return 'translate(' + d.x + ','+ d.y + ')'
            })

          link 
              .attr('x1', function(d){ return d.source.x; }) 
              .attr('y1', function(d){ return d.source.y; })
              .attr('x2', function(d){ return d.target.x; })
              .attr('y2', function(d){ return d.target.y; })
      });

node.append("image")
  .attr("xlink:href", function(d) { return d.img })
  .attr("x", -49)
  .attr("y", -58)
  .attr("width", 100)
  .attr("height", 120);


      node.append('text')
            .text(function(d){ return d.name; })
            .attr("x", -50)
             .attr("y", -60)
            .attr('fill', function(d, i){
              console.log(d.value);
                  if ( i > 0 && d.value < 10 ) {
                        return palette.mediumgray;
                  } else if ( i > 0 && d.value >10 ) {
                        return palette.lightgray;
                  } else {
                        return palette.blue;
                  }
            })
            .attr('text-anchor', function(d, i) {
                  return 'middle';
            })
            .attr('font-size', function(d, i){
                  if (i > 0) {
                        return '.8em';
                  } else {
                        return '.9em';    
                  }
            }) 

force.start();


