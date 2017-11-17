/**
 * Created by tquochung on 6/1/2017.
 */
(function() {
  'use strict';
  angular.module('project')

    .factory('songService', ['$http',function($http){

      var service;
      var views = {
        table: {
          templateUrl: 'app/song/manageSong.html',
          name: 'table'
        },
        add: {
          templateUrl: 'app/song/createSong.html',
          name: 'add'
        },
        edit: {
          templateUrl: 'app/song/editSong.html',
          name: 'edit'
        },
        delete: {
          templateUrl: 'app/song/manageSong.html',
          name: 'delete'
        },
        search: {
          templateUrl: 'app/song/manageSong.html',
          name: 'search'
        }
      };

      //$http get JSON file (listSong)
      var getListSong = $http.get('app/song/listSong.json')
        .then(
          function(response){
            return response.data;
          },
          function(){
            console.log('Cant get listSong')
          }
        );
      var getListDeletedSong= $http.get('app/song/listDeletedSong.json')
        .then(
          function(response){
            return response.data;
          },
          function(){
            console.log('Cant get listDeletedSong')
          }
        );
      service = {
        views: views,
        getListSong: getListSong,
        getListDeletedSong: getListDeletedSong
      };

      return service;
    }]);

})();
