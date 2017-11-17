(function() {
  'use strict';
  angular.module('project')

    .factory('mainService', [function() {
      var menu = {
        song: {
          name: 'song',
          url: ''
        },
        playlist: {
          name: 'playlist',
          url: ''
        }
      };

      var service = {
        menu: menu,
        selectedMenu: menu.song
      };

      return service;
    }]);
})();
