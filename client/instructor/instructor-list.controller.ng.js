'use strict'

angular.module('techApp')
.controller('InstructorListCtrl', function($scope, $meteor, $rootScope) {
 var chartJsonData = [];


 $scope.$meteorSubscribe('record');

 $scope.helpers({
    recordsList() {
      return Record.find();
    }
  });

 
 $scope.viewData = function() {
    
    var chart = dc.heatMap("#test");
    console.log($scope.recordsList);
    //d3.json($scope.recordsList, function(error, data) {
          
         var ndx    = crossfilter($scope.recordsList),
                      runDim = ndx.dimension(function(d) { return [+d.time, d.tag]; }),
                      runGroup = runDim.group().reduceCount(function(d) { return +d.tag; });
                      
                      chart
                         .width(400)
                         .height(200)
                         .margins({top: 0, right: 0, bottom: 5, left: 100})
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
                         .linearColors(["#76ff03", "#f44336"
                         
                         ])

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
      // });
    
 }

 
 
                  
  
});
        