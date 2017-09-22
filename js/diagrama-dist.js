"use strict";

var U = 0, A = 1, B = 2, C = 3, conjuntoA = [], conjuntoB = [], conjuntoC = [], chart = venn.VennDiagram().width(500).height(500), diagrama = d3.select("#venn");

diagrama.datum(sets).call(chart);

var aInput = document.getElementById("a-element"), bInput = document.getElementById("b-element"), cInput = document.getElementById("c-element"), updateGroup = function(t, e) {
    sets[t].size = e.value.length, sets[U].size = sets[A].size + sets[B].size + sets[C].size;
    var n = e.value.split("");
    t == A ? n.forEach(function(t) {
        conjuntoA.push(t);
    }, void 0) : t == B ? n.forEach(function(t) {
        conjuntoB.push(t);
    }, void 0) : n.forEach(function(t) {
        conjuntoC.push(t);
    }, void 0), sets[t].label = e.value, diagrama.datum(sets).call(chart);
};

aInput.addEventListener("change", function() {
    updateGroup(A, this);
}), bInput.addEventListener("change", function() {
    updateGroup(B, this);
}), cInput.addEventListener("change", function() {
    updateGroup(C, this);
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