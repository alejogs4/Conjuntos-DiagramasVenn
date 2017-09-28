const U = 0;
const A = 1;
const B = 2;
const C = 3;
const AB = 4;
const ABC = 6;
const BC = 5;

console.log(sets);
let conjuntoA = [];
let conjuntoB = [];
let conjuntoC = [];

let conjuntoATemporal = [];
let conjuntoBTemporal = [];
let conjuntoCTemporal = [];



let chart = venn.VennDiagram()
    .width(500)
    .height(500);

var diagrama = d3.select("#venn")
diagrama.datum(sets).call(chart);

let ejecutarButton = document.getElementById('ejecutar');
let aInput = document.getElementById('a-element');
let bInput = document.getElementById('b-element');
let cInput = document.getElementById('c-element');

const updateGroup = () => {
    if (aInput.value == "" || bInput.value == "" || cInput.value == "") {
        alert("Todos los campos deben estar llenos");
    }
    else {
        conjuntoA = aInput.value.split('');
        conjuntoATemporal = aInput.value.split('');

        conjuntoB = bInput.value.split('');
        conjuntoBTemporal = bInput.value.split('');

        conjuntoC = cInput.value.split('');
        conjuntoCTemporal = cInput.value.split('');

        filterGroups(conjuntoA, conjuntoB, conjuntoC);
    }
    // sets[group].label=ob.value;
    // diagrama.datum(sets).call(chart);
}

const filterGroups = (groupA, groupB, groupC) => {
    let intersectionGroupAAndGroupB = [];
    let intersectionGroupAAndGroupC = [];
    let intersectionGroupBAndGroupC = [];
    let intersectionABC = [];

    intersectionGroupAAndGroupB.length = 0;
    intersectionGroupAAndGroupC.length = 0;
    intersectionGroupBAndGroupC.length = 0;
    intersectionABC.length = 0;

    filterArrays(groupA, groupB, intersectionGroupAAndGroupB);

    //Filtro elementos repetidos
    let filterArrayAB = intersectionGroupAAndGroupB.filter((el, pos) => {
        return intersectionGroupAAndGroupB.indexOf(el) == pos;
    });

    filterNot(filterArrayAB, groupA);
    filterNot(filterArrayAB, groupB);
    //Filtros para la interseccion ABC
    filterArrays(filterArrayAB, groupC, intersectionABC);
    let filterABC = intersectionABC.filter((el, pos) => {
        return intersectionABC.indexOf(el) == pos;
    });
    filterNot(filterABC, filterArrayAB);
    filterNot(filterABC, groupC);
    filterNot(filterABC, groupA);
    filterNot(filterABC, groupB);

    filterArrays(groupB, groupC, intersectionGroupBAndGroupC);
    let filterArrayBC = intersectionGroupBAndGroupC.filter((el, pos) => {
        return intersectionGroupBAndGroupC.indexOf(el) == pos;
    });
    filterNot(filterArrayBC, groupB);
    filterNot(filterArrayBC, groupC);


    filterArrays(groupC, groupA, intersectionGroupAAndGroupC);
    let filterArrayAC = intersectionGroupAAndGroupC.filter((el, pos) => {
        return intersectionGroupAAndGroupC.indexOf(el) == pos;
    });
    filterNot(filterArrayAC, groupC);
    filterNot(filterArrayAC, groupA);

    // console.log(filterArrayAB);
    // console.log(groupA);
    // console.log(groupB);
    // console.log(groupC);
    // console.log(filterABC);
    // console.log(filterArrayBC);

    sets[A].label = groupA.join(' ');
    sets[A].size = groupA.length + 10;

    sets[B].label = "/////"+groupB.join(' ');
    sets[B].size = groupB.length + 9;

    sets[C].label = groupC.join(',');
    sets[C].size = groupC.length + 8;
    

    sets[AB].label = filterArrayAB.join(' ');
    sets[AB].size = filterArrayAB.length + 5;

    sets[ABC].label = filterABC.join(',');
    sets[ABC].size = filterABC.length + 5;

    sets[BC].label = filterArrayBC.join(' ');
    sets[BC].size = filterArrayBC.length + 5;

    sets[7].label = filterArrayAC.join(' ');
    sets[7].size = filterArrayAC.length + 5;
    diagrama.datum(sets).call(chart);
}

const filterNot = (intersection, group) => {
    intersection.forEach((el) => {
        for (let j = 0; j < group.length; j++) {
            if (el == group[j]) {
                group.splice(j, 1);
                break;
            }
        }
    });
}

const filterArrays = (main, reference, newA) => {
    main.forEach((el) => {
        for (let i = 0; i < reference.length; i++) {
            if (el == reference[i]) {
                newA.push(el);
                break;
            }
        }
    });
}

// Functions that update every group
ejecutarButton.addEventListener('click', () => {
    updateGroup();
});


var tooltip = d3.select("body").append("div")
    .attr("class", "venntooltip");
diagrama.selectAll("path")
    .style("stroke-opacity", 0)
    .style("stroke", "#fff")
    .style("stroke-width", 3)
diagrama.selectAll("g")
    .on("mouseover", function (d, i) {
        // sort all the areas relative to the current item
        venn.sortAreas(diagrama, d);
        // Display a tooltip with the current size
        console.log(this);
        tooltip.transition().duration(400).style("opacity", .9);
        tooltip.text(d.label);
        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .4 : .1)
            .style("stroke-opacity", 1);
    })
    .on("mousemove", function () {
        tooltip.style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d, i) {
        tooltip.transition().duration(400).style("opacity", 0);
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path")
            .style("fill-opacity", d.sets.length == 1 ? .25 : .0)
            .style("stroke-opacity", 0);
    });