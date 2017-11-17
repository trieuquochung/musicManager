/**
 * Created by tquochung on 5/16/2017.
 */
angular.module('project').controller('home', [
  function () {
    console.log('Started controller home');
	var vm=this;
	vm.openMenu=openMenu;
    function openMenu(){
    	console.log('aaa')
    }
}

  ]);
