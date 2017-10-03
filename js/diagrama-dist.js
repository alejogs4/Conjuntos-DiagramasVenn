"use strict";

var U = 0, A = 1, B = 2, C = 3, AB = 4, ABC = 6, BC = 5, conjuntoA = [], conjuntoB = [], conjuntoC = [], conjuntoU = [], chart = venn.VennDiagram().width(500).height(500), diagrama = d3.select("#venn");

diagrama.datum(sets).call(chart);

var ejecutarButton = document.getElementById("ejecutar"), ejecutar4 = document.getElementById("ejecutar2"), aInput = document.getElementById("a-element"), bInput = document.getElementById("b-element"), cInput = document.getElementById("c-element"), groupUniversal = document.getElementById("universal-group"), uInput = document.getElementById("u-element"), btnUniversal = document.getElementById("btn-universal"), updateGroup = function(t) {
    "" == aInput.value || "" == bInput.value || "" == cInput.value ? alert("Todos los campos deben estar llenos") : (conjuntoA = aInput.value.split(""), 
    conjuntoB = bInput.value.split(""), conjuntoC = cInput.value.split(""), filterGroups(conjuntoA, conjuntoB, conjuntoC, t));
}, filterGroups = function(t, e, n, l) {
    var o = [], a = [], i = [], s = [];
    o.length = 0, a.length = 0, i.length = 0, s.length = 0, filterArrays(t, e, o);
    var r = o.filter(function(t, e) {
        return o.indexOf(t) == e;
    });
    filterNot(r, t), filterNot(r, e), filterArrays(r, n, s);
    var u = s.filter(function(t, e) {
        return s.indexOf(t) == e;
    });
    filterNot(u, r), filterNot(u, n), filterNot(u, t), filterNot(u, e), filterArrays(e, n, i);
    var c = i.filter(function(t, e) {
        return i.indexOf(t) == e;
    });
    filterNot(c, e), filterNot(c, n), filterArrays(n, t, a);
    var d = a.filter(function(t, e) {
        return a.indexOf(t) == e;
    });
    filterNot(d, n), filterNot(d, t), 1 == l ? resizeGroups("", "", "///", "///", "///", "///", "///", t, e, n, r, u, c, d) : 2 == l && resizeGroups("", "", "", "///", "", "///", "///", t, e, n, r, u, c, d), 
    groupUniversal.classList.toggle("inactive");
}, filterNot = function(t, e) {
    t.forEach(function(t) {
        for (var n = 0; n < e.length; n++) if (t == e[n]) {
            e.splice(n, 1);
            break;
        }
    });
}, filterArrays = function(t, e, n) {
    t.forEach(function(t) {
        for (var l = 0; l < e.length; l++) if (t == e[l]) {
            n.push(t);
            break;
        }
    });
}, resizeGroups = function(t, e, n, l, o, a, i, s, r, u, c, d, p, f) {
    sets[A].label = t + " " + s.join(" ") + " " + t, sets[A].size = s.length + 10, sets[B].label = e + " " + r.join(" ") + " " + e, 
    sets[B].size = r.length + 9, sets[C].label = n + " " + u.join(" ") + " " + n, sets[C].size = u.length + 8, 
    sets[4].label = l + " " + c.join(" ") + " " + l, sets[4].size = c.length + 5, sets[6].label = o + " " + d.join(" ") + " " + o, 
    sets[6].size = d.length + 5, sets[5].label = a + " " + p.join(" ") + " " + a, sets[5].size = p.length + 5, 
    sets[7].label = i + " " + f.join(" ") + " " + i, sets[7].size = f.length + 5, diagrama.datum(sets).call(chart);
}, addUniversal = function() {
    var t = (aInput.value + bInput.value + cInput.value).split(""), e = void 0;
    "" == uInput.value ? alert("El valor universal debe tener algun valor") : (e = uInput.value.split(""), 
    t.forEach(function(t) {
        for (var n = 0; n < e.length; n++) if (t == e[n]) return void alert("El elemento " + t + " ya esta en el conjunto");
    })), console.log(e), sets[0].label = e.join(" "), sets[0].size = sets[0].size + e.length, 
    diagrama.datum(sets).call(chart);
};

ejecutarButton.addEventListener("click", function() {
    updateGroup(1);
}), ejecutar4.addEventListener("click", function() {
    updateGroup(2);
}), btnUniversal.addEventListener("click", function() {
    addUniversal();
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