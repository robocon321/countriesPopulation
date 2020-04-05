function readTextFile(file) {
    var data;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                data = allText;
            }
        }
    }
    rawFile.send(null);
    return data;
}

var { data } = JSON.parse(readTextFile('./data.json'));

data.splice(10,data.length);

var maxPopCountry = Math.max.apply(Math, data.map(function(d) { return d.pop2019; }));
var sumPopCountry = data.reduce((acc,curr)=>{return acc+parseInt(curr.pop2019)},0)/1000;

var heightBar = 30;

var svg = d3.select('body')
    .append('svg')
    .attr('width', "100%")
    .attr('height', "300px");

var g = svg.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .attr('transform', (d, i) => `translate(0,${i*heightBar})`);

g.data(data)
    .append('text')
    .text((d,i)=>d.name)
    .attr('y',20)
    .attr('fill', 'black');

g.data(data)
    .append('rect')
    .attr('width', (d, i) => `${d.pop2019*100*1.0/maxPopCountry-5}%`)
    .attr('height', heightBar - 1)
    .attr('transform',`translate(90,0)`)
    .attr('fill', '#006E10');

g.data(data)
    .append('text')
    .text((d, i) => Math.floor(d.pop2019/1000))
    .attr('fill', 'white')
    .attr('dy', "1.3em")
    .attr('x', (d, i) => `${d.pop2019*100*1.0/maxPopCountry}%`)
    .attr('text-anchor', 'end');

d3.select('body').append('h1').text(`Total: ${sumPopCountry}`);
