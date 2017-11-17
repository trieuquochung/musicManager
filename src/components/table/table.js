(function() {
  'use strict';
  angular.module('project')
    .directive('tableDirective',[function(){
      return {
        restrict: 'A',
        templateUrl: 'components/table/table.html',
        scope: {
          output: '=?',
          data:'=',
          searchData: '=',
          column: '=',
          selectedAllItem: '=',
          editFunction: '=',
          deleteFunction: '=',
          showActionColumn: '=',
        },
        bindToController: true,
        controller: 'tableController',
        controllerAs: 'vm'
      }
    }])
})();

