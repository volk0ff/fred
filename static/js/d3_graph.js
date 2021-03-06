var margin = {top: 30, right: 20, bottom: 30, left: 50},
width = 600 - margin.left - margin.right,
height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%Y-%m-%d").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x).orient('bottom').ticks(5);
var yAxis = d3.svg.axis().scale(y).orient('left').ticks(5);

var valueline = d3.svg.line()
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.value); });

var svg = d3.select('.graph-container')
	.append('svg')
		.attr('width', width + margin.left + margin.right)
		.attr('height', height + margin.top + margin.bottom)
	.append('g')
		.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

d3.json("{% static 'graph_data.json' %}", function(error, data) {
data.forEach(function(d) {
	d.date = parseDate(d.date);
	d.value = +d.value;
})

x.domain(d3.extent(data, function(d) { return d.date }));
y.domain([0, d3.max(data, function(d) { return d.value })]);

svg.append('path')
	.attr('d', valueline(data));

svg.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + height + ')')
	.call(xAxis);

svg.append('g')
	.attr('class', 'y axis')
	.call(yAxis);	
});