angular.module('userApp',['appRoutes','userControllers','userServices','mainCntroller','authServices','productController','productServices'])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});