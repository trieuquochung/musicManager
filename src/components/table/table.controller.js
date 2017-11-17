(function() {
  'use strict';
  angular.module('project')
    .controller('tableController', ['$scope','orderByFilter', function ($scope, orderBy) {
      console.log('Started controller table');
      var vm = this;
      vm.toggleEachItem = toggleEachItem;
      vm.toggleAllItem = toggleAllItem;
      vm.sortBy = sortBy;


      this.$onInit = function () {
        if(vm.output) {
          vm.output.getSelectedList = getSelectedList;
        }
      };

      //***** Implement checkbox function *****
      /**
       * When click in checkbox to selecting item, this function will create an array which contain all of item was selected
       * @returns {Array} selectedList
       */
      function getSelectedList() {
        var selectedList = []; // Create new array contain items which was clicked in checkbox
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

      /**
       * Check if any item was unselected, the checkbox on top will be unchecked
       */
      function toggleEachItem() {
        for (var i = 0; i <vm.data.length; i++) {
          if (vm.data[i].selected === false) {
           vm.selectedAllItem = false;
            return;
          }
        }
       vm.selectedAllItem = true;
      }

      /**
       * Checkbox on top, if it was selected or not, all item below will be selected or not
       */
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


      //***** Implement sortData function *****
      /**
       * Sort data in table ascending or descending by alphabet
       * @param {Object} columnProperties: This is a properties of each column, include name and sort
       * {String} columnProperties.name: name of each column [ex: name; artist; creator]
       * {Object} columnProperties.sort: Column have or don't have sorting function
       * {Integer} columnProperties.sort.ascending: 0: default; -1: descending; 1: ascending
       */
      function sortBy(columnProperties) {
        if (columnProperties.sort) {
          if (columnProperties.sort.ascending === 0){
            vm.propertyName = columnProperties.name;
            vm.data = orderBy(vm.data, vm.propertyName, false);
            columnProperties.sort.ascending = 1;
          }
          else {
            if (columnProperties.sort.ascending === 1) {
              vm.propertyName = columnProperties.name;
              vm.data = orderBy(vm.data, vm.propertyName, true);
              columnProperties.sort.ascending = -1;
            }
            else {
              if (columnProperties.sort.ascending === -1) {
                vm.data = orderBy(vm.data, 'id', false); //Default is sort by id: Ascending
                columnProperties.sort.ascending = 0;
              }
            }
          }
        }
      }
    }]);
})();
