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
        getPlaylist: getPlaylist
      };

      return service;
    }]);

})();
