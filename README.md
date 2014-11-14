gm.datepickerMultiSelect
========================

gm.datepickerMultiSelect is an AngularJS module to extend UI Bootstrap's Datepicker directive to allow for multiple date selections.

Simply include the module:

  angular.module('myApp', ['ui.bootstrap', 'gm.datepickerMultiSelect']);

And use thusly:

  <datepicker ng-model='activeDate' multi-select='selectedDates'><datepicker>
  
The property 'selectDates' on the controller (or its scope) then acts as a model for any dates selected in the Datepicker.

Also supports toggling.

![Alt text](screenshot.png "Screenshot")
