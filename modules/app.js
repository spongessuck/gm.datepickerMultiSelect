angular.module('app', ['gm.datepickerMultiSelect'])
.controller('AppCtrl', function() {
  this.activeDate;
  this.selectedDates = [];
  
  this.removeFromSelected = function(dt) {
    this.selectedDates.splice(this.selectedDates.indexOf(dt), 1);
  }
});