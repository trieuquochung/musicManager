(function() {
  angular.module('project')
  .config(function($i18nextProvider) {
    $i18nextProvider.options = {
      lng: 'en',
      useCookie: false,
      useLocalStorage: false,
      fallbackLng: 'en',
      resGetPath: 'language/__lng__/translation.json',
      defaultLoadingValue: ''
    }});
})();
