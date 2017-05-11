var app =  angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/home.html'
	})

	.when('/product',{
		templateUrl:'app/views/pages/product.html',
		controller: 'productCtrl',
		controllerAs: 'product',
		authenticated: true
	})

	.when('/profile',{
		templateUrl:'app/views/pages/profile.html',
		controller: 'profileCtrl',
		controllerAs: 'profile',
		authenticated: true
	})

	.when('/facebook/:token',{
		templateUrl:'app/views/pages/social/social.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook',
		authenticated: false
	})
	.when('/facebookerror',{
		templateUrl:'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook',
		authenticated: false
	})
	.when('/google/:token',{
		templateUrl:'app/views/pages/social/social.html',
		controller: 'googleCtrl',
		controllerAs: 'google',
		authenticated: false
	})
	.when('/googleerror',{
		templateUrl:'app/views/pages/users/login.html',
		controller: 'googleCtrl',
		controllerAs: 'google',
		authenticated: false
	})
	
	
	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase:false
	});
});
app.run(['$rootScope','Auth','$location',function($rootScope,Auth,$location){
	$rootScope.$on('$routeChangeStart',function(event,next,current){

		if(next.$$route.authenticated == true){
			if(!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/')
			}
		}else if(next.$$route.authenticated == false){
			if(Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/profile');
			}
		} 
	});
}]);
