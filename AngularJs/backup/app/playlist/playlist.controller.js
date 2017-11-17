(function() {
  'use strict';
  angular.module('project')
    .controller('playlistController', ['$location','playlistService','songService', '$mdDialog',
      function ($location, playlistService, songService, $mdDialog) {
        console.log('Started controller playlist');
        var vm = this;
        vm.goToTableView = goToTableView;
        vm.goToCreateView = goToCreateView;
        vm.createPlaylist = createPlaylist;
        vm.goToSearchView = goToSearchView;
        vm.goToEditView = goToEditView;
        vm.showConfirm = showConfirm;
        vm.showConfirmEachPlaylist = showConfirmEachPlaylist;
        vm.savePlaylist = savePlaylist;
        vm.isDisableDeleteButton = isDisableDeleteButton;

        vm.detailTemplate = playlistService.views.detail;
        //Default view in Playlist layout
        var views = playlistService.views;
        vm.currentView = views.table;

        //Create a breadcrumb
        vm.breadcrumb = {
          home: {
            title: 'Home',
            onClick: function () {
              $location.url('/');
            }
          },
          playlist: {
            title: 'Playlists',
            onClick: function () {
              $location.url('/playlist');
            }
          }
        };

        vm.showActionColumn = true;

        vm.outputFromTableComponent = {};

        //Get listPlaylist from JSON file
        playlistService.getPlaylist.then(function(data){
          vm.listPlaylist = data;
        });

        //Get listSong from JSON file
        songService.getListSong.then(function(data){
          vm.listSong = data;
        });

        //Get listDeletedSong from JSON file
        songService.getListDeletedSong.then(function(data){
          vm.listDeletedSong = data;
        });


        //***Implement checkSongInPlaylist function***
        //When playlistController started, this function will check all song in vm.listSong, if
        // some song was deleted which also in playlist, they will be deleting in playlist
        // vm.checkSongInPlaylist = checkSongInPlaylist;
        // function checkSongInPlaylist(){
        //   vm.listSongTemp = angular.copy(vm.listSong);
        //   vm.listPlaylistTemp = angular.copy(vm.listPlaylist);
        //   for (var i = 0; i < vm.listPlaylistTemp.length; i++){
        //     angular.forEach(vm.listPlaylistTemp[i].listSong, function(songOfPlaylist){
        //       angular.forEach(vm.listSongTemp, function(songOutOfPlaylist){
        //         if (songOfPlaylist.id === songOutOfPlaylist.id){
        //           console.log('songOfPlaylist',songOfPlaylist);
        //         } else vm.listPlaylistTemp[i].listSong.splice(vm.listPlaylistTemp[i].listSong.indexOf(songOfPlaylist),1);
        //       })
        //     });
        //     console.log('vm.listPlaylistTemp[i].listSong', vm.listPlaylistTemp[i].listSong);
        //   }
        //   console.log('vm.listSongTemp', vm.listSongTemp);
        // }

        vm.currentSongsInPlaylist = currentSongsInPlaylist;
        function currentSongsInPlaylist(playlist){
          for (var i = 0; i < vm.listPlaylist.length; i++){
            if (vm.listPlaylist[i].id === playlist.id) {
                vm.songsInPlaylist = vm.listPlaylist[i].listSong;
                console.log('vm.songsInPlaylist', vm.songsInPlaylist);
                angular.forEach(vm.songsInPlaylist, function(songInPlaylist){
                  angular.forEach(vm.listDeletedSong, function(songDeleted){
                  if (songDeleted.id === songInPlaylist.id){
                    console.log('songInPlaylist.id', songInPlaylist.id);
                    console.log('songDeleted.id',songDeleted.id);
                    vm.songsInPlaylist.splice(vm.songsInPlaylist.indexOf(songInPlaylist),1);
                  }
                })
              });

                if (playlist.listSong.length > 0) {
                  angular.forEach(playlist.listSong, function(song){
                    song.selected = false
                  });}
                console.log('playlist.listSong', playlist.listSong);
            }
          }
        }

        vm.currentSongsNotInPlaylist = currentSongsNotInPlaylist;
        function currentSongsNotInPlaylist() {
          vm.songsNotInPlaylist = angular.copy(vm.listSong);
          angular.forEach(vm.songsInPlaylist, function(songInPlaylist) {
            angular.forEach(vm.songsNotInPlaylist, function(songNotInPlaylist){
              if (songNotInPlaylist.id === songInPlaylist.id){
                vm.songsNotInPlaylist.splice(vm.songsNotInPlaylist.indexOf(songNotInPlaylist),1);
              }
            })
            });
          console.log('vm.listSong',vm.listSong);
          console.log('vm.songsNotInPlaylist',vm.songsNotInPlaylist);
        }
        function goToTableView() {
          vm.showActionColumn = true;
          vm.currentView = views.table;
          angular.forEach(vm.listSong, function(song){
            if (song.selected === true) {
              song.selected = false;
            }
          });
        }

        //***Implement createPlaylist function***
        function goToCreateView() {
          vm.currentPlaylist = {};
          vm.currentView = views.add;
        }
        function createPlaylist(currentPlaylist) {

          vm.showActionColumn = false;
          //Create ID for currentPlaylist
          currentPlaylist.id = vm.listPlaylist.length + 1;
          for (var i = 0; i<vm.listPlaylist.length; i++) {
            if (vm.listPlaylist[i].id === currentPlaylist.id) {
              currentPlaylist.id++;
            }
          }
          var selectedSong = vm.outputFromTableComponent.getSelectedList();
          //Add song to currentPlaylist
          currentPlaylist.listSong = angular.copy(selectedSong);
          //Add currentPlaylist to listPlaylist
          vm.listPlaylist.push(currentPlaylist);
          console.log('selectedSong', selectedSong);
          console.log('vm.listPlaylist', vm.listPlaylist);
          goToTableView();

        }
        //***End createPlaylist function***


        //***Implement editPlaylist function ***
        function goToEditView(playlist) {
          vm.currentView = views.edit;
          vm.showActionColumn = false;
          vm.currentPlaylist = angular.copy(playlist);
          currentSongsInPlaylist(playlist);
          currentSongsNotInPlaylist();
          angular.forEach(vm.songsNotInPlaylist, function(song){
            if (song.selected=true) {
              song.selected= false;
            }
          });
          console.log('vm.listDeletedSong',vm.listDeletedSong);
        }

        function savePlaylist(playlist) {
          vm.currentView = views.table;
          var i = 0;
          var selectedSong = vm.outputFromTableComponent.getSelectedList();
          while (i < vm.listPlaylist.length) {
            if (vm.listPlaylist[i].id === playlist.id) {
              vm.listPlaylist[i].name = playlist.name;
              vm.listPlaylist[i].artist = playlist.artist;
              for (var j = 0; j<selectedSong.length; j++){
                vm.listPlaylist[i].listSong.push(selectedSong[j]);
              }

            }
            i++;
          }
          goToTableView();
          console.log('selectedSong', selectedSong);
        }
        //***End editPlaylist function***

        //Start deletePlaylist function
        function goToDeleteView(playlist) {
          for (var i = 0; i <vm.listPlaylist.length; i++) {
            if (vm.listPlaylist[i].id === playlist.id) {
              vm.listPlaylist.splice(i, 1);
              i--;
            }
          }
          //Clear the check mark
          if (vm.listPlaylist.length === 0)vm.selectedAll = false;
        }
        //Confirm delete each playlist in table
        function showConfirmEachPlaylist(playlist) {
          var confirmDelete;
          confirmDelete = $mdDialog.confirm()
            .title('Delete Playlist')
            .textContent('Are you sure you want to delete this playlist?')
            .ok('Yes')
            .cancel('No');
          $mdDialog.show(confirmDelete)
            .then(
              function () {
                goToDeleteView(playlist);
              },
              function () {

              }
            );
        }

        //***Start deleteMultiPlaylist function***
        function isDisableDeleteButton() {
          if(vm.outputFromTableComponent.getSelectedList) {
            return vm.outputFromTableComponent.getSelectedList().length === 0;
          }
          return true;
        }
        function goToMultiDeleteView() {
          vm.selectedPlaylist = [];
          for (var j = 0; j < vm.listPlaylist.length; j++) {
            if (vm.listPlaylist[j].selected === true) {
              vm.listPlaylist.splice(j, 1);
              j--;
            }
          }
          //Clear the check mark
          if (vm.listPlaylist.length === 0) vm.selectedAll = false;
          console.log('vm.selectedPlaylist', vm.selectedPlaylist);
          console.log('vm.listPlaylist', vm.listPlaylist);
        }

        //Confirm delete selected playlists
        function showConfirm() {
          var confirmDelete;
          confirmDelete = $mdDialog.confirm()
            .title('Delete Playlist')
            .textContent('Are you sure you want to delete selected playlists?')
            .ok('Yes')
            .cancel('No');
          $mdDialog.show(confirmDelete).then(function () {
            goToMultiDeleteView();
          }, function () {
            goToTableView();
          });
        }

        //Search Function
        vm.endSearch = endSearch;
        vm.hideButton = false;
        vm.hideSearchBar = true;

        function goToSearchView() {
          vm.hideButton = true;
          vm.hideSearchBar = false;
        }

        function endSearch() {
          vm.hideButton = false;
          vm.hideSearchBar = true;
          vm.searchPlaylist = '';
        }

        vm.columnPlaylist =[
          {
            id: 1,
            title: 'Names',
            field: 'name'
          },

          {
            id: 2,
            title: 'Creator',
            field: 'creator'
          }
        ];

        vm.columnSongInCreatePlaylist=[
          {
            id: 1,
            title: 'Names',
            field: 'name'
          },
          {
            id: 2,
            title: 'Artist',
            field: 'artist'
          }
        ];

        vm.columnSongInEditPlaylist=[
          {
            id: 1,
            title: 'Names',
            field: 'name'
          }
        ]
      }]);

})();
