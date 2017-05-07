var app =  angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/home.html'
	})

	.when('/product',{
		templateUrl:'app/views/pages/product.html',
		controller: 'productCtrl',
		controllerAs: 'product'
	})

	.when('/facebook/:token',{
		templateUrl:'app/views/pages/social/social.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook'
	})
	.when('/facebookerror',{
		templateUrl:'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook'
	})
	.when('/google/:token',{
		templateUrl:'app/views/pages/social/social.html',
		controller: 'googleCtrl',
		controllerAs: 'google'
	})
	.when('/googleerror',{
		templateUrl:'app/views/pages/users/login.html',
		controller: 'googleCtrl',
		controllerAs: 'google'
	})
	
	
	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase:false
	});
});
// app.run(['$rootScope','Auth','$location',function($rootScope,Auth,$location){
// 	$rootScope.$on('$routeChangeStart',function(event,next,current){

// 		if(next.$$route.authenticated == true){
// 			if(!Auth.isLoggedIn()){
// 				event.preventDefault();
// 				$location.path('/')
// 			}
// 		}else if(next.$$route.authenticated == false){
// 			// console.log('should not be authenticated');
// 		} 
	
// 	});
// }]);
