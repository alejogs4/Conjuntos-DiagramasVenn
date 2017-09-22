const U=0;
const A=1;
const B=2;
const C=3;

let conjuntoA=[];
let conjuntoB=[];
let conjuntoC=[];

let chart = venn.VennDiagram()
.width(500)
.height(500);

var diagrama = d3.select("#venn")
diagrama.datum(sets).call(chart);

let aInput=document.getElementById('a-element');
let bInput=document.getElementById('b-element');
let cInput=document.getElementById('c-element');

const updateGroup=(group,ob)=>{
    sets[group].size=ob.value.length;
    sets[U].size=sets[A].size+sets[B].size+sets[C].size;
    let labelGroup=ob.value.split("");

    if(group==A){
        labelGroup.forEach(function(el) {
            conjuntoA.push(el);
        }, this);
    }else if(group==B){
        labelGroup.forEach(function(el){
            conjuntoB.push(el);
        },this);
    }else{
        labelGroup.forEach(function(el){
            conjuntoC.push(el);
        },this);
    }
    sets[group].label=ob.value;
    diagrama.datum(sets).call(chart);
}
aInput.addEventListener('change',function(){
    updateGroup(A,this);
});
bInput.addEventListener('change',function(){
    updateGroup(B,this);
});
cInput.addEventListener('change',function(){
    updateGroup(C,this);
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