(function() {
  'use strict';
  angular.module('project')

    .factory('playlistService', ['$http',function($http){

      var service;
      var views = {
        table: {
          templateUrl: 'app/playlist/managePlaylist.html',
          name: 'table'
        },
        add: {
          templateUrl: 'app/playlist/createPlaylist.html',
          name: 'add'
        },
        edit: {
          templateUrl: 'app/playlist/editPlaylist.html',
          name: 'edit'
        },
        detail: {
          templateUrl: 'app/playlist/detailPlaylist.html',
          name: 'detail'
        }
      };

      var cache = {
        currentView: views.table,
        currentPlaylist: {
          name: '',
          artist: ''
        },
        searchLayout: {
          isShowButton: true,
          isShowSearchBar: false,
          searchPlaylist: ''
        }
      };
      //$http get JSON file (playlist)
      var getPlaylist = $http.get('app/playlist/playlist.json')
        .then(
          function(response){
            return response.data;
          },
          function(){
            console.log('Cant get playlist')
          }
        );
      service = {
        views: views,
        cache: cache,
        getPlaylist: getPlaylist
      };

      return service;
    }]);

})();
