"use strict";

var U = 0, A = 1, B = 2, C = 3, AB = 4, ABC = 6, BC = 5;

console.log(sets);

var conjuntoA = [], conjuntoB = [], conjuntoC = [], conjuntoATemporal = [], conjuntoBTemporal = [], conjuntoCTemporal = [], chart = venn.VennDiagram().width(500).height(500), diagrama = d3.select("#venn");

diagrama.datum(sets).call(chart);

var ejecutarButton = document.getElementById("ejecutar"), aInput = document.getElementById("a-element"), bInput = document.getElementById("b-element"), cInput = document.getElementById("c-element"), updateGroup = function() {
    "" == aInput.value || "" == bInput.value || "" == cInput.value ? alert("Todos los campos deben estar llenos") : (conjuntoA = aInput.value.split(""), 
    conjuntoATemporal = aInput.value.split(""), conjuntoB = bInput.value.split(""), 
    conjuntoBTemporal = bInput.value.split(""), conjuntoC = cInput.value.split(""), 
    conjuntoCTemporal = cInput.value.split(""), filterGroups(conjuntoA, conjuntoB, conjuntoC));
}, filterGroups = function(t, e, o) {
    var n = [], l = [], s = [], a = [];
    n.length = 0, l.length = 0, s.length = 0, a.length = 0, filterArrays(t, e, n);
    var i = n.filter(function(t, e) {
        return n.indexOf(t) == e;
    });
    filterNot(i, t), filterNot(i, e), filterArrays(i, o, a);
    var r = a.filter(function(t, e) {
        return a.indexOf(t) == e;
    });
    filterNot(r, i), filterNot(r, o), filterNot(r, t), filterNot(r, e), filterArrays(e, o, s);
    var u = s.filter(function(t, e) {
        return s.indexOf(t) == e;
    });
    filterNot(u, e), filterNot(u, o), filterArrays(o, t, l);
    var c = l.filter(function(t, e) {
        return l.indexOf(t) == e;
    });
    filterNot(c, o), filterNot(c, t), console.log(i), console.log(t), console.log(e), 
    console.log(o), console.log(r), console.log(u), sets[A].label = t.join(","), sets[A].size = t.length + 10, 
    sets[B].label = e.join(","), sets[B].size = e.length + 9, sets[C].label = o.join(","), 
    sets[C].size = o.length + 8, sets[AB].label = i.join(","), sets[AB].size = i.length + 5, 
    sets[ABC].label = r.join(","), sets[ABC].size = r.length + 5, sets[BC].label = u.join(","), 
    sets[BC].size = u.length + 5, sets[7].label = c.join(","), sets[7].size = c.length + 5, 
    diagrama.datum(sets).call(chart);
}, filterNot = function(t, e) {
    t.forEach(function(t) {
        for (var o = 0; o < e.length; o++) if (t == e[o]) {
            e.splice(o, 1);
            break;
        }
    });
}, filterArrays = function(t, e, o) {
    t.forEach(function(t) {
        for (var n = 0; n < e.length; n++) if (t == e[n]) {
            o.push(t);
            break;
        }
    });
};

ejecutarButton.addEventListener("click", function() {
    updateGroup();
});

var tooltip = d3.select("body").append("div").attr("class", "venntooltip");

diagrama.selectAll("path").style("stroke-opacity", 0).style("stroke", "#fff").style("stroke-width", 3), 
diagrama.selectAll("g").on("mouseover", function(t, e) {
    venn.sortAreas(diagrama, t), tooltip.transition().duration(400).style("opacity", .9), 
    tooltip.text(t.label), d3.select(this).transition("tooltip").duration(400).select("path").style("fill-opacity", 1 == t.sets.length ? .4 : .1).style("stroke-opacity", 1);
}).on("mousemove", function() {
    tooltip.style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
}).on("mouseout", function(t, e) {
    tooltip.transition().duration(400).style("opacity", 0), d3.select(this).transition("tooltip").duration(400).select("path").style("fill-opacity", 1 == t.sets.length ? .25 : 0).style("stroke-opacity", 0);
});