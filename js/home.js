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
                ,resolve:{
              course:['$q',function($q) {
                var deferred=$q.defer();
                progress.setProgress(20);
                  $.ajax({type :"get",async:true,url : config.url.course,dataType : "jsonp",
                        jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
                        data: {opt:'showtable'},
                        success : function(data){
                          progress.setProgress(100);
                          if(data.msg==='ok'){
                            deferred.resolve(data);
                          }else{
                            alert("Get Course error");
                          }
                        },
                        error:function(){
                          progress.setProgress(100);
                            alert("Can't connet to server!");
                        }
                });
                  return deferred.promise;
              }]
            }
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
  activeThis('#homeli');
})
.controller("CourseController",['$scope','course',function($scope,course) {
  activeThis('#courseli');
  $scope.course={};
  $scope.courseList=course;
  $scope.updateCourse=function(index) {
    var name=prompt("Please enter the new Course name!","");
    if (name!=null && name!=""){
      $.ajax({
            type :"get",
            async:false,
            url : config.url.course,
            dataType : "jsonp",
            data: {opt:'update',course:$scope.courseList.table[index].course,course2:name},
            success : function(data){
              if(data.msg==='error'){
                alert("Update Course fail!");
              }
              if(data.msg==='ok'){
                progress.setProgress(50);
                alert("Update Course success!");
                $scope.courseList.table[index].course=name; 
                progress.setProgress(100);
              }
            },
            error:function(){
                progress.setProgress(100);
                alert("Can't connet to server!");
            }
        });
    }
  };
  $scope.deleteCourse=function(index) {
    $.ajax({
          type :"get",
          async:false,
          url : config.url.course,
          dataType : "jsonp",
          data: {opt:'delete',course:$scope.courseList.table[index].course},
          success : function(data){
            if(data.msg==='error'){
              alert("Delete Course fail!");
            }
            if(data.msg==='ok'){
              progress.setProgress(50);
              alert("Delete Course success!");
              $scope.courseList.table.splice(index,1); 
              progress.setProgress(100);
            }
          },
          error:function(){
              progress.setProgress(100);
              alert("Can't connet to server!");
          }
      });
  };
  $scope.addCourse=function() {
    progress.setProgress(10);
    $.ajax({
          type :"get",
          async:false,
          url : config.url.course,
          dataType : "jsonp",
          data: {opt:'add',course:$scope.course.name},
          success : function(data){
            if(data.msg==='error'){
              alert("add Course fail!");
              
            }
            if(data.msg==='ok'){
              progress.setProgress(50);
              alert("add Course success!");
              $scope.courseList.table.push({course:$scope.course.name});
              progress.setProgress(100);
            }
          },
          error:function(){
              progress.setProgress(100);
              alert("Can't connet to server!");
          }
      });
    //   $.ajax({type :"get",async:true,url : config.url.course,dataType : "jsonp",
    //         jsonpCallback:"success_jsonpCallback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
    //         data: {opt:'showtable'},
    //         success : function(data){
    //           progress.setProgress(100);
    //           if(data.msg==='ok'){
    //             $scope.$apply(function() {
    //               $scope.courseList=data;
    //             });
    //           }else{
    //             alert("Get Course error");
    //           }
    //         },
    //         error:function(){
    //           progress.setProgress(100);
    //             alert("Can't connet to server!");
    //         }
    // });
  };

}])
.controller("AboutController",function($scope) {
  activeThis('#aboutli');
});

function logout() {
  var res=$.ajax({
          type :"get",
          async:true,
          url : config.url.logout,
          dataType : "jsonp",
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

