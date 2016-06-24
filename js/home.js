function progressCtrl () {
  var precent=0;
  function showProgress(){
    $(".progress").show();
    $("#progressbar").css({"width":precent+"%"});
    if(precent===100){
      setTimeout(function(){$(".progress").hide();precent=0;$("#progressbar").css({"width":precent+"%"});},600);
    }
  }
function hideProgress(){
    $("#progressbar").hide();
  }
  return {
    setProgress:function (data) {
      precent=data;
      showProgress();
    },
    getProgress:function () {
      return precent;
    },
    addProgress:function (data){
      precent+=data;
      showProgress();
    }
  };
}
var progress=progressCtrl();
var app = angular.module('myApp', ['ngRoute']).config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'temp/home.html',
                controller: 'HomeController'
            })
            .when('/newCourse', {
                templateUrl: 'temp/Course.html',
                controller: 'CourseController'
            })
            .when('/about', {
                templateUrl: 'temp/about.html',
                controller: 'AboutController'
            })
            .otherwise('/home')
    }
]).controller('navCtrl', function($scope) {
      var res=$.ajax({
              type :"get",
              async:true,
              url : config.url.loginstate,
              dataType : "jsonp",
              jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
              data: {},
              success : function(data){
                //alert(JSON.stringify(data));
                if(data.msg=='ok'){
                  $scope.$apply(function() {
                    $scope.user = data;
                    progress.addProgress(100);
                  });
                }else{
                  progress.addProgress(100);
                  alert("User are not online!\nwill  turn to login page.");
                  window.location.href='login.html';
                }
              },
              error:function(){
                  alert("Can't connet to server!");
              }
          });

}).controller("HomeController",function($scope) {

}).controller("CourseController",function($scope) {
  $scope.course={};
  $scope.addCourse=function() {
    $.ajax({
          type :"get",
          async:true,
          url : config.url.course,
          dataType : "jsonp",
          jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
          data: {opt:'add',course:$scope.course.name},
          success : function(data){
            if(data.msg==='error'){
              alert("add Course fail!");
              
            }
            if(data.msg==='ok'){
              progress.addProgress(100);
              alert("add Course success!");
            }
          },
          error:function(){
              alert("Can't connet to server!");
          }
      });
  };
  $.ajax({
        type :"get",
        async:true,
        url : config.url.course,
        dataType : "jsonp",
        jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
        data: {opt:'showtable'},
        success : function(data){
          if(data.msg==='ok'){
            $scope.$apply(function() {
              $scope.courseList = data;
              progress.addProgress(100);
            });
          }else{

          }
        },
        error:function(){
            alert("Get course error!");
        }
    });
}).controller("AboutController",function($scope) {

});

function logout() {
  var res=$.ajax({
          type :"get",
          async:true,
          url : config.url.logout,
          dataType : "jsonp",
          jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
          data: {},
          success : function(data){
            alert("Logout success!\nwill  turn to index page.");
                  window.location.href='index.html';
          },
          error:function(){
              alert("Can't connet to server!");
          }
      });
}
function activeCtrl(){
  var item=document.getElementById('homeli');
  return function(that) {
    $(item).removeClass("active");
    item=that;
    $(item).addClass("active");
  };
}
var activeThis=activeCtrl();
