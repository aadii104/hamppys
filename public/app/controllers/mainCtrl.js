angular.module('mainCntroller',['authServices'])
.controller('mainCtrl', function (Auth,$timeout,$location,$rootScope,$window) {
    
    var app = this;


    $rootScope.$on('$routeChangeStart', function(err){
         if(Auth.isLoggedIn()){
            
            console.log(" sucess user is logged in");
            
            app.isLoggedIn = true;
            
            Auth.getUser().then(function(data){
                console.log(data.data.email);
                app.username = data.data.email;
            });

        }else{
            if(err)console.log("swag" + err);
            console.log("user not login ");
            
            app.isLoggedIn = false;
        }

        if( $location.hash() == '_-_') $location.hash(null);

    });   

    // this.facebook = function(){
    //     $window.location = $window.location.protol + '//' + $window.location.host + '/auth/facebook';
    // }
    //  this.google = function(){
    //     $window.location = $window.location.protol + '//' + $window.location.host + '/auth/google';
    // }

    this.doLogin = function(loginData){
        Auth.login(app.loginData).then(function(data){

            if(data.data.success){

                $timeout(function(){

                    $location.path('/choose')
                    
                })
            }
        })
    }
    this.logout = function(){
        Auth.logout();
        $timeout(function(){
            $location.path('/');
        },100);
    
    };
    
})