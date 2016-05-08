'use strict'

angular.module('techApp')
.controller('InstructorListCtrl', function($scope, $meteor, $rootScope) {


 $scope.$meteorSubscribe('lecture');
 $scope.$meteorSubscribe('record');

 $scope.helpers({
    lecturesList() {
      return Lecture.find();
    }
  });


 var chart = dc.heatMap("#test");
 d3.csv("/client/data.csv", function(error, data) {
   var ndx    = crossfilter(data),
                runDim = ndx.dimension(function(d) { return [+d.time, d.tag]; }),
                runGroup = runDim.group().reduceCount(function(d) { return +d.tag; });
        chart
                .width(600)
                .height(200)
                .dimension(runDim)
                .group(runGroup)
                .keyAccessor(function(d) {
                    return +d.key[0];
                })
                .valueAccessor(function(d) {
                    return d.key[1];
                })
                .colorAccessor(function(d) {
                    return +d.value;
                })
                .title(function(d) {
                    return "Time:   " + d.key[0] + "\n" +
                            "Tag:  " + d.key[1] + "\n" +
                            "Number: " + d.value + " students";})
                .linearColors(["#76ff03", "#f44336"])
                chart.on('filtered.monitor', function(chart, filter) {
                    console.log(chart);
                    var player = $('#video1').get(0);
                //    $('#gettime').click(function(){
                        if(player){
                            player.currentTime=filter[0];
                        }
                  //  });
                })
                .calculateColorDomain();
        chart.render();
 });
                  
  
});
        