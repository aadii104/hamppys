angular.module('userControllers',['userServices'])

.controller('regCtrl', function($http,$location,$timeout,User){
    var app =this;
    this.regUser = function(regData){
        console.log('form submitted');
        User.create(app.regData).then(function(data){
            if(data.data.success){
                console.log(data.data.message);
                app.successMsg = data.data.message;

                $timeout(function(){
                     $location.path('/product');
                },2000);

            }else{
                console.log(data.data.message);
                app.errorMsg = data.data.message;
            }
        });
    }
})
.controller('facebookCtrl',function($routeParams, Auth, $location, $window){
    var app = this;
    if($window.location.pathname == "/facebookerror"){
        app.errorMsg = 'facebook email not found';
    }else{
        Auth.facebook($routeParams.token);
        $location.path('/product');
    }
})
.controller('googleCtrl',function($routeParams, Auth, $location, $window){
    var app = this;
    if($window.location.pathname == "/googleerror"){
        app.errorMsg = 'Google email not found';
    }else{
        Auth.google($routeParams.token);
        console.log("lool " + $routeParams.token)
        $location.path('/product');
    }
})