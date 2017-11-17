(function() {
  'use strict';
  angular
    .module('project')
    .controller('headerController', ['$scope',
      function ($scope) {
        console.log('Started controller index');
        var vm = this;
        vm.openMenu = openMenu;
        function openMenu(){
          vm.showSideNav=true;
        }
      }
    ])
})();
