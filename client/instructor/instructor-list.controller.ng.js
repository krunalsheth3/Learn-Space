'use strict'

angular.module('techApp')
.controller('InstructorListCtrl', function($scope) {


  // var chart = dc.heatMap("#test");
  //     d3.csv("/public/data.csv", function(error, data) {
  //         var ndx    = crossfilter(data),
  //                 runDim = ndx.dimension(function(d) { return [+d.time, d.tag]; }),
  //                 runGroup = runDim.group().reduceCount(function(d) { return +d.tag; });
  //         chart
  //                 .width(600)
  //                 .height(200)
  //                 .dimension(runDim)
  //                 .group(runGroup)
  //                 .keyAccessor(function(d) {
  //                     return +d.key[0];
  //                 })
  //                 .valueAccessor(function(d) {
  //                     return d.key[1];
  //                 })
  //                 .colorAccessor(function(d) {
  //                     return +d.value;
  //                 })
  //                 .title(function(d) {
  //                     return "Time:   " + d.key[0] + "\n" +
  //                             "Tag:  " + d.key[1] + "\n" +
  //                             "Number: " + d.value + " students";})
  //                 .linearColors(["#76ff03", "#f44336"])
  //                 chart.on('filtered.monitor', function(chart, filter) {
  //                     console.log(chart);
  //                     var player = $('#video1').get(0);
  //                 //    $('#gettime').click(function(){
  //                         if(player){
  //                             current_time=player.currentTime;
  //                             $('#showtime').html(current_time+" seconds");
  //                             player.currentTime=filter[0];
  //                             if(player){
  //                                 current_time=player.currentTime;
  //                                 $('#showtime').html(current_time+" seconds");
  //                                 player.currentTime=filter[0];
  //                             }
  //                         }
  //                   //  });
  //                 })
  //                 .calculateColorDomain();
  // $scope.page = 1;
  // $scope.perPage = 3;
  // $scope.sort = {name_sort : 1};
  // $scope.orderProperty = '1';
  
  // $scope.helpers({
  //   instructor: function() {
  //     return Instructor.find({}, {
  //       sort: $scope.getReactively('sort') 
  //     });
  //   },
  //   instructorCount: function() {
  //     return Counts.get('numberOfInstructor');
  //   }
  // });
                  
  // $scope.subscribe('instructor', function() {
  //   return [{
  //     sort: $scope.getReactively('sort'),
  //     limit: parseInt($scope.getReactively('perPage')),
  //     skip: ((parseInt($scope.getReactively('page'))) - 1) * (parseInt($scope.getReactively('perPage')))
  //   }, $scope.getReactively('search')];
  // });

  // $scope.save = function() {
  //   if ($scope.form.$valid) {
  //     Instructor.insert($scope.newInstructor);
  //     $scope.newInstructor = undefined;
  //   }
  // };
                  
  // $scope.remove = function(instructor) {
  //   Instructor.remove({_id:instructor._id});
  // };
                  
  // $scope.pageChanged = function(newPage) {
  //   $scope.page = newPage;
  // };
                  
  // return $scope.$watch('orderProperty', function() {
  //   if ($scope.orderProperty) {
  //     $scope.sort = {
  //       name_sort: parseInt($scope.orderProperty)
  //     };
  //   }
  // });
});
        