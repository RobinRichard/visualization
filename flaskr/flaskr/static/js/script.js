$(document).ready(function (){

 console.log($('.genderradio').val())
    var max=0;
    loadchartdata("Male",1981)

    var slider = d3.select('#year');
    slider.on('change', function() {
    $('#selected_year').val(this.value);
       d3.selectAll("svg > *").remove();
       loadchartdata("Male",this.value)
    });

        $('.genderradio').change(function(){
               d3.selectAll("svg > *").remove();
               console.log(this.value)
               console.log($('#year').val())
               loadchartdata(this.value,$('#year').val())
        });

function draw(data)
{
    var mywidth = document.getElementById('svg').clientWidth;
    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
    var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +mywidth - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.2);

        var x1 = d3.scaleBand()
            .padding(0.1);

        var y = d3.scaleLinear()
            .rangeRound([(height / 1.75), 0]);

        var z = d3.scaleOrdinal()
            .range(["#37A3D6", "#FF9400", "#ff0000"]);

  var categoriesNames = data.map(function(d) { return d.country; });
  var rateNames = data[0].values.map(function(d) { return d.type; });

  
  x0.domain(categoriesNames);
  x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
  // y.domain([0, d3.max(data, function(country) { return d3.max(country.values, function(d) { return d.value; }); })]);
 
  y.domain([0, max]);

  var legend = g.append("g")
    	.attr("class", "legend");

  var legenG = legend.selectAll("g")
        .data(data[0].values.map(function(d) { return d.type; }))
        .enter()
        .append("g")
        .attr("transform", function(d, i) { return "translate(" + i * (width / (rateNames.length + 1)) + ", 0)"; });

  legenG.append("rect")
      .attr("x", 0)
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", z);

  legenG.append("text")
      .attr("x", 25)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });


  // add the Y gridlines
  g.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + (height / 7) + ")")
        .call(d3.axisLeft(y)
          .tickSize(-width)
          .tickFormat("")
          .ticks(6)
         );

  var barG = g.append("g")
        .selectAll("g")
        .data(data)
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x0(d.country) + ",0)"; });

  barG.selectAll(".bars")
        .data(function(d) { return d.values; })
        .enter()
        .append("rect")
        .attr("class", "bars")
        .attr("transform", "translate(0," + (height / 7) + ")")
        .attr("x", function(d) { return x1(d.type); })
        .attr("width", x1.bandwidth())
        .attr("fill", function(d) { return z(d.type); })
        .attr("y", (height / 2))
        .on('mouseover', function(d){
            div.transition()
            .duration(200)
            .style("opacity", .9);
            div.html("<b>" + d.country + " </b> ( " + d.type + " )<br/><b>" +d.value+"  %</b>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
        })
        .on('mouseout', function(d){
            div.transition()
            .duration(500)
            .style("opacity", 0);
        })
        .transition()
        .delay(function (d,i){ return i * 250;}) // this is to do left then right bars
        .duration(250)
        .attr("y", function(d) { return y(d.value); })
        .attr('height', function( d ) {
                    if (d.value > 0) { return ((height / 1.75))  - y( d.value ); }
                    else {return 0}
        });

  g.append("g")
        .attr("class", "x-axis axis")
        .attr("transform", "translate(0," + (height / 1.4) + ")")
        .call(d3.axisBottom(x0))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)")
        .text(function (d) {
            if(d.length > 14) { return d.substring(0,14)+'...'; }
            else { return d; }
        });

  g.append("g")
        .attr("class", "y-axis axis")
        .attr("transform", "translate(0," + (height / 7) + ")")
        .call(d3.axisLeft(y).ticks(7));

}

function loadchartdata(genderFilter,yearFilter)
{
$.ajax({
        type: 'GET',
        url: '/getjsondata',
        data: { get_param: 'value' },
            success: function (returndata)
            {
                max=0;
                var obj = jQuery.parseJSON(returndata);

                var conlist = [ ];
                 $.each(obj, function(index, element) {
                        conlist.push(element.country);
                });
                conlist = $.unique(conlist);

                var Dataobject = [];
                var formattedAge = {"15-24":"Age 15 to 24","25-54":"Age 25 to 54","55 above":"Age above 55"}

                $.each(conlist, function(index, conelement) {
                    var conobject = {};
                    var object = [];
                    conobject['country'] = conelement;

                     $.each(obj, function(index, element) {
                        if(conelement == element.country){
                            var ydata = element.data
                            var age = element.agegroup
                            var gender = element.gender
                            if(gender==genderFilter)
                            {
                                $.each(ydata, function(index, yelement)
                                    {
                                        if(index==yearFilter)
                                        {
                                            var ageobject = {}
                                            var fltvalue = parseFloat(yelement)
                                            max = (fltvalue > max ) ? fltvalue : max;
                                            ageobject['value']=fltvalue.toFixed(2);
                                            ageobject['type']= formattedAge[age];
                                            ageobject['country'] = conelement;
                                            object.push(ageobject);
                                        }
                                    }
                                );                          
                            }
                        }
                     });
                     var yearobj={}
                     yearobj['values']=object
                     Dataobject.push($.extend( conobject,yearobj))
                });
                draw(Dataobject)
            }
        });

}

});