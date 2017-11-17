(function() {
  'use strict';
  angular.module('project')
    .directive('breadcrumb', function(){
      return {
        restrict: 'A',
        templateUrl: 'components/breadcrumb/breadcrumb.html',
        scope: {
          data:'='
        },
        bindToController: true,
        controller: 'breadcrumbController',
        controllerAs: 'vm'
      }
    })
})();
