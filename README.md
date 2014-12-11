gm.datepickerMultiSelect
========================

gm.datepickerMultiSelect is an AngularJS module that extends UI Bootstrap's Datepicker directive to allow for multiple date selections.

Simply include the module in your app:

    angular.module('myApp', ['ui.bootstrap', 'gm.datepickerMultiSelect']);

And use the included 'multiSelect' directive thusly:

    <datepicker ng-model='activeDate' multi-select='selectedDates'><datepicker>

The directive binds an array holding any dates selected in the Datepicker to the specified property on the controller (or its scope).

Tested in AngularJS 1.2.25 and 1.3.1, and UI Bootstrap 0.11.x.

NOTE: Selected dates are stored as an array of time values, not date objects.

Also supports toggling.

<a href='http://plnkr.co/iVSdXt' target='_blank'>View demo on Plunker</a>

Screenshot:
![Alt text](screenshot.png "Screenshot")
