(function() {
  'use strict';
  angular
    .module('project')
    .controller('mainController', ['$location', '$mdSidenav',
      function ($location, $mdSidenav) {
        console.log('Started controller main');
        var vm = this;
        vm.toggleMenu = toggleMenu('left');
        vm.navigateToSong = navigateToSong;
        vm.navigateToPlaylist = navigateToPlaylist;
        vm.isSelectedSong = isSelectedSong;
        vm.isSelectedPlaylist = isSelectedPlaylist;

        function toggleMenu(left) {
          return function() {
            $mdSidenav(left).toggle()
          };
        }

        function isSelectedSong(){
          return $location.path() ==='/song';

        }
        function isSelectedPlaylist(){
          return $location.path() ==='/playlist';

        }

        function navigateToSong(){
          $location.url('/song');
          $mdSidenav('left').close();

        }

        function navigateToPlaylist(){
          $location.url('/playlist');
          $mdSidenav('left').close();
        }
      }
    ])
})();
