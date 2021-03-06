(function() {
  /**
   * @ngdoc overview
   * @name project
   *
   * @description
   * Generated by Yo men
   *
   * **Note:** Describe what this module does
   *
   * @example
   http://localhost:8000
   */
  'use strict';
  angular.module('project', ['ngRoute', 'ngMaterial', 'jm.i18next'])
    .config([ '$routeProvider', '$locationProvider', '$i18nextProvider', function($routeProvider,$locationProvider,$i18nextProvider) {

      $routeProvider
        .when('/song', {
          templateUrl: 'app/song/song.html',
          controller: 'songController',
          controllerAs: 'vm'
        })
        .when('/playlist', {
          templateUrl: 'app/playlist/playlist.html',
          controller: 'playlistController',
          controllerAs: 'vm'
        })
        .when('/', {
          redirectTo: '/song',
        })
        .otherwise({
          redirectTo: '/song'
        });

      $locationProvider.html5Mode(true);

      // $i18nextProvider.options = {
      //   lng: 'en',
      //   useCookie: false,
      //   useLocalStorage: false,
      //   fallbackLng: 'en',
      //   resGetPath: 'language/__lng__/translation.json',
      //   defaultLoadingValue: ''
      // };
    }])

    /**
     * @ngdoc overview
     * @name $rootScope
     *
     * @description
     * Global Utility functions attached on the $rootScope of the ngdocs module
     **/
    .run([ '$rootScope', '$location', function($rootScope,$location) {
      /**
       *
       * @ngdoc function
       * @name $rootScope.isActive
       *
       * @description
       * Global utility function,
       * used to apply active classes to link buttons
       *
       * @example
       <pre>
       <a href="/example" ng-class="{ 'active': isActive('/example') }">
       Example
       </a>
       </pre>
       */
      $rootScope.isActive = function (href) {
        return href === $location.path();
      };
    }]);

})();
