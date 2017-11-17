(function() {
  'use strict';
  angular
    .module('project')
    .controller('headerController', ['$location','mainService' ,
      function ($location,mainService) {
        console.log('Started mainController');
        var vm = this;
        vm.openMenu = openMenu;
        vm.navigateToSong = navigateToSong;
        vm.navigateToPlaylist = navigateToPlaylist;
        vm.isShow = false;

        vm.mainService = mainService;

        function openMenu(){
          vm.isShow = !vm.isShow;
          if (vm.isShow) {
            $('#leftNav').removeClass('md-closed');
          }else{
            $('#leftNav').addClass('md-closed');
          }
        }

        function navigateToSong(){
          vm.mainService.selectedMenu = mainService.menu.song;
          vm.isShow = false;
          $location.url('/');
          $('#leftNav').addClass('md-closed');
        }

        function navigateToPlaylist(){
          vm.mainService.selectedMenu = mainService.menu.playlist;
          vm.isShow = false;
          $location.url('/playlist');
          $('#leftNav').addClass('md-closed');
        }
      }
    ])
})();
