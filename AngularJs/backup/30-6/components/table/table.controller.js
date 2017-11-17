(function() {
  'use strict';
  angular.module('project')
    .controller('tableController', ['$scope', function ($scope) {
      console.log('Started controller table');
      var vm = this;
      vm.toggleEachItem = toggleEachItem;
      vm.toggleAllItem = toggleAllItem;

      this.$onInit = function () {
        if(vm.output) {
          vm.output.getSelectedList = getSelectedList;
        }
      };

      //***** Implement checkbox function *****

      function getSelectedList(){
        var selectedList = [];
        angular.forEach(vm.data, function(item){
          if (item.selected === true) {
            selectedList.push(item);
            if (selectedList.length === vm.data.length) {
              vm.selectedAllItem = true;
            }
          }
        });
        return selectedList;
      }

      function toggleEachItem() {
        for (var i = 0; i <vm.data.length; i++) {
          if (vm.data[i].selected === false) {
           vm.selectedAllItem = false;
            return;
          }
        }
       vm.selectedAllItem = true;
      }

      function toggleAllItem() {
        if (vm.selectedAllItem === true) {
          angular.forEach(vm.data, function (item) {
            item.selected = true;
          });
        } else {
          angular.forEach(vm.data, function (item) {
            item.selected = false;
          });
        }
      }
      //***** End checkbox function *****
      // vm.selectItem = selectItem;
      // function selectItem(item){
      //   vm.selectedItem = item;
      //   console.log('vm.selectedItem', vm.selectedItem);
      // }
      //
      // vm.isSelected = isSelected;
      //
      // function isSelected(item){
      //   console.log(item);
      //   return vm.selectedItem === item;
      // }






    }]);
})();
