(function() {
  'use strict';
  angular.module('project')
    .controller('songController', ['songService','$mdDialog', '$scope', '$location',
      function (songService, $mdDialog, $scope, $location) {
        console.log('Started controller song');
        var vm = this;
        vm.cache = songService.cache;
        vm.goToTableView = goToTableView;
        vm.goToCreateView = goToCreateView;
        vm.createSong = createSong;
        vm.goToEditView = goToEditView;
        vm.saveSong = saveSong;
        vm.showConfirm = showConfirm;
        vm.goToSearchView = goToSearchView;
        vm.showConfirmEachSong = showConfirmEachSong;
        vm.isDisableDeleteButton = isDisableDeleteButton;

        //Default view in Song layout
        var views = songService.views;

        //Create a breadcrumb
        vm.breadcrumb = {
          home: {
            title: 'Home',
            onClick: function () {
              $location.url('/');

            }
          },
          song: {
            title: 'Songs',
            onClick: function () {

              $location.url('/song');
            }
          }
        };
        vm.showActionColumn = true;

        vm.outputFromTableComponent = {};

        //Get listSong from JSON file by using getListSong promise
        songService.getListSong.then(function(data){
          vm.listSong = data;
        });

        songService.getListDeletedSong.then(function(data){
          vm.listDeletedSong = data;
        });

        function goToTableView() {
          vm.cache.currentView = views.table;
          angular.forEach(vm.listSong, function(song){
            if (song.selected === true) {
              song.selected = false;
            }
          });
          vm.selectedAll = false;
        }

        //***Implement createSong function***

        function goToCreateView() {
          vm.cache.currentView = views.add;
          vm.cache.currentSong = {};
        }

        function createSong(currentSong) {
          //Create ID for currentSong
          currentSong.id = vm.listSong.length + 1;
          for (var i = 0; i<vm.listSong.length; i++) {
            if (vm.listSong[i].id == currentSong.id) {
              currentSong.id++;
            }
          }
          vm.listSong.push(currentSong);
          goToTableView();
        }

        //***End createSong function***


        //***Implement editSong function ***
        function goToEditView(song) {
          vm.cache.currentView = views.edit;
          vm.cache.currentSong = angular.copy(song);
        }
        function saveSong(song) {
          vm.cache.currentView = views.table;
          var i = 0;
          while (i < vm.listSong.length) {
            if (vm.listSong[i].id === song.id) {
              vm.listSong[i].name = song.name;
              vm.listSong[i].artist = song.artist;
            }
            i++;
          }
          goToTableView();
        }
        //***End editSong function***

        //Start deleteSong function
        function goToDeleteView(song) {
          for (var i = 0; i <vm.listSong.length; i++) {
            if (vm.listSong[i].id === song.id) {
              vm.listDeletedSong.push(vm.listSong[i]);
              vm.listSong.splice(i, 1);
              i--;
            }
          }
          console.log('vm.listDeletedSong', vm.listDeletedSong);
          //Clear the check mark
          if (vm.listSong.length === 0) {
            vm.selectedAll = false;
          }
        }
        //Confirm delete each song in table
        function showConfirmEachSong(song) {
          var confirmDeleteSong;
          confirmDeleteSong = $mdDialog.confirm()
            .title('Delete Song')
            .textContent('Are you sure you want to delete this song?')
            .ok('Yes')
            .cancel('No');
          $mdDialog.show(confirmDeleteSong)
            .then(
              function () {
                goToDeleteView(song);
              },
              function () {

              }
            );
        }

        //***Start deleteMultiSong function***
        function isDisableDeleteButton() {
          if(vm.outputFromTableComponent.getSelectedList) {
            return vm.outputFromTableComponent.getSelectedList().length === 0;
          }
          return true;
        }
        function goToMultiDeleteView() {

          for (var j = 0; j < vm.listSong.length; j++) {
            if (vm.listSong[j].selected === true) {
              vm.listDeletedSong.push(vm.listSong[j]);
              vm.listSong.splice(j, 1);
              j--;
            }
          }
          //Clear the check mark
          if (vm.listSong.length === 0) vm.selectedAll = false;
          console.log('vm.listDeletedSong', vm.listDeletedSong);
          console.log('vm.listSong', vm.listSong);
        }

        //Confirm delete selected songs
        function showConfirm() {
          var confirmDeleteSong;
          confirmDeleteSong = $mdDialog.confirm()
            .title('Delete Song')
            .textContent('Are you sure you want to delete selected songs?')
            .ok('Yes')
            .cancel('No');
          $mdDialog.show(confirmDeleteSong).then(function () {
            goToMultiDeleteView();
          }, function () {
            vm.cache.currentView = views.table;
          });
        }

        //Search Function
        vm.endSearch = endSearch;

        function goToSearchView() {
          vm.cache.searchLayout.isShowButton = false;
          vm.cache.searchLayout.isShowSearchBar = true;
        }

        function endSearch() {
          vm.cache.searchLayout.isShowButton = true;
          vm.cache.searchLayout.isShowSearchBar = false;
          vm.cache.searchLayout.searchSong = '';
        }

        vm.columnSong =[
          {
            id: 1,
            title: 'Name',
            properties: {
              name: 'name',
              sort: {
                ascending: 0
              }
            }
          },
          {
            id: 2,
            title: 'Artist',
            properties: {
              name: 'artist',
              sort: {
                ascending: 0
              }
            }
          },
          {
            id: 3,
            title: 'Year',
            properties: {
              name: 'year'
            }
          }
        ];
    }]);
})();
