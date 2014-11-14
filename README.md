gm.datepickerMultiSelect
========================

gm.datepickerMultiSelect is an AngularJS module to extend UI Bootstrap's Datepicker directive to allow for multiple date selections.

Simply include the module in your app:

    angular.module('myApp', ['ui.bootstrap', 'gm.datepickerMultiSelect']);

And use thusly:

    <datepicker ng-model='activeDate' multi-select='selectedDates'><datepicker>
  
The property 'selectDates' on the controller (or its scope) then acts as a model for any dates selected in the Datepicker.

Tested with AngularJS 1.2.25 and 1.3.1, and UI Bootstrap 0.11.x.

NOTE: Selected dates are stored as an array of time values, not date objects.

Also supports toggling.

TODO: Update view when the month changes.

<a href='http://plnkr.co/edit/X7josME8hpIgJDt3IibG?p=preview' target='_blank'>DEMO</a>

![Alt text](screenshot.png "Screenshot")
