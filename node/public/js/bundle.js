/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/js/script.js":
/*!*****************************!*\
  !*** ./public/js/script.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("$(document).ready(function(){\n   var max=0;\n  loadchartdata(\"Male\",1981)\n    // show loader\n    $(\"#overlay\").css('display','block');\n    \n    var slider = d3.select('#year');\n    slider.on('change', function() {\n    $('#selected_year').val(this.value);\n       loadchartdata(\"Male\",this.value)\n    });\n\n        $('.genderradio').change(function(){\n               \n               loadchartdata(this.value,$('#year').val())\n        });\n\nfunction draw(data)\n{\n    d3.selectAll(\"svg > *\").remove();\n    var mywidth = document.getElementById('svg').clientWidth;\n    //Remove tooltip div\n    $( \".tooltip\" ).remove();\n    //create tooltip\n    var div = d3.select(\"body\").append(\"div\")\n    .attr(\"class\", \"tooltip\")\n    .style(\"opacity\", 0);\n    var svg = d3.select(\"svg\"),\n    margin = {top: 20, right: 20, bottom: 30, left: 40},\n\n    width = +mywidth - margin.left - margin.right,\n    height = +svg.attr(\"height\") - margin.top - margin.bottom,\n    g = svg.append(\"g\").attr(\"transform\", \"translate(\" + margin.left + \",\" + margin.top + \")\");\n\n        var x0 = d3.scaleBand()\n            .rangeRound([0, width])\n            .paddingInner(0.2);\n\n        var x1 = d3.scaleBand()\n            .padding(0.1);\n\n        var y = d3.scaleLinear()\n            .rangeRound([(height / 1.75), 0]);\n\n        var z = d3.scaleOrdinal()\n            .range([\"#37A3D6\", \"#FF9400\", \"#ff0000\"]);\n\n  var categoriesNames = data.map(function(d) { return d.country; });\n  var rateNames = data[0].values.map(function(d) { return d.type; });\n\n  x0.domain(categoriesNames);\n  x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);\n//   y.domain([0, d3.max(data, function(country) { return d3.max(country.values, function(d) { return d.value; }); })]);\n   y.domain([0, max]);\n\n  var legend = g.append(\"g\")\n    \t.attr(\"class\", \"legend\");\n\n  var legenG = legend.selectAll(\"g\")\n        .data(data[0].values.map(function(d) { return d.type; }))\n        .enter()\n        .append(\"g\")\n        .attr(\"transform\", function(d, i) { return \"translate(\" + i * (width / (rateNames.length + 1)) + \", 0)\"; });\n\n  legenG.append(\"rect\")\n      .attr(\"x\", 0)\n      .attr(\"width\", 20)\n      .attr(\"height\", 20)\n      .attr(\"fill\", z);\n\n  legenG.append(\"text\")\n      .attr(\"x\", 25)\n      .attr(\"y\", 9.5)\n      .attr(\"dy\", \"0.32em\")\n      .text(function(d) { return d; });\n\n\n  // add the Y gridlines\n  g.append(\"g\")\n        .attr(\"class\", \"grid\")\n        .attr(\"transform\", \"translate(0,\" + (height / 7) + \")\")\n        .call(d3.axisLeft(y)\n          .tickSize(-width)\n          .tickFormat(\"\")\n          .ticks(6)\n         );\n\n  var barG = g.append(\"g\")\n        .selectAll(\"g\")\n        .data(data)\n        .enter()\n        .append(\"g\")\n        .attr(\"transform\", function(d) { return \"translate(\" + x0(d.country) + \",0)\"; });\n\n  barG.selectAll(\".bars\")\n        .data(function(d) { return d.values; })\n        .enter()\n        .append(\"rect\")\n        .attr(\"class\", \"bars\")\n        .attr(\"transform\", \"translate(0,\" + (height / 7) + \")\")\n        .attr(\"x\", function(d) { return x1(d.type); })\n        .attr(\"width\", x1.bandwidth())\n        .attr(\"fill\", function(d) { return z(d.type); })\n        .attr(\"y\", (height / 2))\n        .on('mouseover', function(d){\n            div.transition()\n            .duration(200)\n            .style(\"opacity\", .9);\n            div.html(\"<b>\" + d.country + \" </b> ( \" + d.type + \" )<br/><b>\" +d.value+\" % </b>\")\n            .style(\"left\", (d3.event.pageX) + \"px\")\n            .style(\"top\", (d3.event.pageY - 28) + \"px\");\n        })\n        .on('mouseout', function(d){\n            div.transition()\n            .duration(500)\n            .style(\"opacity\", 0);\n        })\n        .transition()\n        .delay(function (d,i){ return i * 250;}) // this is to do left then right bars\n        .duration(250)\n        .attr(\"y\", function(d) { return y(d.value); })\n        .attr('height', function( d ) {\n                    if (d.value > 0) { return ((height / 1.75))  - y( d.value ); }\n                    else {return 0}\n        });\n\n  g.append(\"g\")\n        .attr(\"class\", \"x-axis axis\")\n        .attr(\"transform\", \"translate(0,\" + (height / 1.4) + \")\")\n        .call(d3.axisBottom(x0))\n        .selectAll(\"text\")\n        .style(\"text-anchor\", \"end\")\n        .attr(\"dx\", \"-.8em\")\n        .attr(\"dy\", \".15em\")\n        .attr(\"transform\", \"rotate(-65)\")\n        .text(function (d) {\n            if(d.length > 14) { return d.substring(0,14)+'...'; }\n            else { return d; }\n        });\n\n  g.append(\"g\")\n        .attr(\"class\", \"y-axis axis\")\n        .attr(\"transform\", \"translate(0,\" + (height / 7) + \")\")\n        .call(d3.axisLeft(y).ticks(7));\n}\n\n   function loadchartdata(genderFilter,yearFilter)\n    {\n        \n   $.ajax({\n        type: 'GET',\n        url: '/getjsondata',\n        data: { get_param: 'value' },\n            success: function (returndata,jqXHR)\n            {\n                console.log(returndata.status)\n                max=0;\n                var obj = jQuery.parseJSON(returndata)\n                var conlist = [ ];\n                 $.each(obj, function(index, element) {\n                        conlist.push(element.country);\n                });\n                conlist = $.unique(conlist);\n\n                var Dataobject = [];\n\n                var formattedAge = {\"15-24\":\"Age 15 to 24\",\"25-54\":\"Age 25 to 54\",\"55 above\":\"Age above 55\"}\n\n                $.each(conlist, function(index, conelement) {\n                    var conobject = {};\n                    var object = [];\n                    conobject['country'] = conelement;\n\n                     $.each(obj, function(index, element) {\n                        if(conelement == element.country){\n                        var ydata = element.data\n                        var age = element.agegroup\n                        var gender = element.gender\n                        if(gender==genderFilter)\n                            {\n                                $.each(ydata, function(index, yelement)\n                                    {\n                                        if(index==yearFilter)\n                                        {\n                                            var ageobject = {}\n                                            var fltvalue = parseFloat(yelement)\n                                            max = (fltvalue > max ) ? fltvalue : max;\n                                            ageobject['value']=fltvalue.toFixed(2)\n                                            ageobject['type']= formattedAge[age]\n                                            ageobject['country'] = conelement;\n                                            object.push(ageobject)\n                                        }\n                                    }\n                                );                          \n                            }\n                       }\n                     });\n                     var yearobj={}\n                     yearobj['values']=object\n                     Dataobject.push($.extend( conobject,yearobj))\n                });\n                draw(Dataobject)\n                $(\"#overlay\").css('display','none');\n            },\n            error: function (jqXHR, exception) {\n             alert(\"Ajax loading Error\");\n            }\n        });\n    }\n});\n\n\n//# sourceURL=webpack:///./public/js/script.js?");

/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** multi ./public/js/script.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! /home/user/ARULR1/Visualization/node/public/js/script.js */\"./public/js/script.js\");\n\n\n//# sourceURL=webpack:///multi_./public/js/script.js?");

/***/ })

/******/ });