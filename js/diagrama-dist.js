"use strict";

var U = 0, A = 1, B = 2, C = 3, AB = 4, ABC = 6, BC = 5, conjuntoA = [], conjuntoB = [], conjuntoC = [], chart = venn.VennDiagram().width(500).height(500), diagrama = d3.select("#venn");

diagrama.datum(sets).call(chart);

var ejecutarButton = document.getElementById("ejecutar"), ejecutar4 = document.getElementById("ejecutar2"), aInput = document.getElementById("a-element"), bInput = document.getElementById("b-element"), cInput = document.getElementById("c-element"), updateGroup = function(t) {
    "" == aInput.value || "" == bInput.value || "" == cInput.value ? alert("Todos los campos deben estar llenos") : (conjuntoA = aInput.value.split(""), 
    conjuntoB = bInput.value.split(""), conjuntoC = cInput.value.split(""), filterGroups(conjuntoA, conjuntoB, conjuntoC, t));
}, filterGroups = function(t, e, n, o) {
    var l = [], i = [], s = [], r = [];
    l.length = 0, i.length = 0, s.length = 0, r.length = 0, filterArrays(t, e, l);
    var a = l.filter(function(t, e) {
        return l.indexOf(t) == e;
    });
    filterNot(a, t), filterNot(a, e), filterArrays(a, n, r);
    var u = r.filter(function(t, e) {
        return r.indexOf(t) == e;
    });
    filterNot(u, a), filterNot(u, n), filterNot(u, t), filterNot(u, e), filterArrays(e, n, s);
    var c = s.filter(function(t, e) {
        return s.indexOf(t) == e;
    });
    filterNot(c, e), filterNot(c, n), filterArrays(n, t, i);
    var f = i.filter(function(t, e) {
        return i.indexOf(t) == e;
    });
    filterNot(f, n), filterNot(f, t), 1 == o ? resizeGroups("", "", "///", "///", "///", "///", "///", t, e, n, a, u, c, f) : 2 == o && resizeGroups("", "", "", "///", "", "///", "///", t, e, n, a, u, c, f);
}, filterNot = function(t, e) {
    t.forEach(function(t) {
        for (var n = 0; n < e.length; n++) if (t == e[n]) {
            e.splice(n, 1);
            break;
        }
    });
}, filterArrays = function(t, e, n) {
    t.forEach(function(t) {
        for (var o = 0; o < e.length; o++) if (t == e[o]) {
            n.push(t);
            break;
        }
    });
}, resizeGroups = function(t, e, n, o, l, i, s, r, a, u, c, f, p, d) {
    sets[A].label = t + " " + r.join(" ") + " " + t, sets[A].size = r.length + 10, sets[B].label = e + " " + a.join(" ") + " " + e, 
    sets[B].size = a.length + 9, sets[C].label = n + " " + u.join(" ") + " " + n, sets[C].size = u.length + 8, 
    sets[4].label = o + " " + c.join(" ") + " " + o, sets[4].size = c.length + 5, sets[6].label = l + " " + f.join(" ") + " " + l, 
    sets[6].size = f.length + 5, sets[5].label = i + " " + p.join(" ") + " " + i, sets[5].size = p.length + 5, 
    sets[7].label = s + " " + d.join(" ") + " " + s, sets[7].size = d.length + 5, diagrama.datum(sets).call(chart);
};

ejecutarButton.addEventListener("click", function() {
    updateGroup(1);
}), ejecutar4.addEventListener("click", function() {
    updateGroup(2);
});

var tooltip = d3.select("body").append("div").attr("class", "venntooltip");

diagrama.selectAll("path").style("stroke-opacity", 0).style("stroke", "#fff").style("stroke-width", 3), 
diagrama.selectAll("g").on("mouseover", function(t, e) {
    venn.sortAreas(diagrama, t), console.log(this), tooltip.transition().duration(400).style("opacity", .9), 
    tooltip.text(t.label), d3.select(this).transition("tooltip").duration(400).select("path").style("fill-opacity", 1 == t.sets.length ? .4 : .1).style("stroke-opacity", 1);
}).on("mousemove", function() {
    tooltip.style("left", d3.event.pageX + "px").style("top", d3.event.pageY - 28 + "px");
}).on("mouseout", function(t, e) {
    tooltip.transition().duration(400).style("opacity", 0), d3.select(this).transition("tooltip").duration(400).select("path").style("fill-opacity", 1 == t.sets.length ? .25 : 0).style("stroke-opacity", 0);
});