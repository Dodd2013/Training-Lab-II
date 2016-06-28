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
            }).when('/attendance', {
                templateUrl: 'temp/attendance.html',
                controller: 'AttendanceController'
            })
            .when('/course', {
                templateUrl: 'temp/Course.html',
                controller: 'CourseController',
                resolve:{
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
            .when('/addquestion', {
                templateUrl: 'temp/addquestion.html',
                controller: 'AddQuestionController'
            })
            .when('/question', {
                templateUrl: 'temp/question.html',
                controller: 'QuestionController',
                    resolve:{
                  question:['$q',function($q) {
                    var deferred=$q.defer();
                    progress.setProgress(20);
                      $.ajax({
                                type :"get",
                                async:false,
                                url : config.url.addQuestion,
                                dataType : "jsonp",
                                data: {opt:"showtable"},
                                success : function(data){
                                  progress.setProgress(100);
                                  if(data.msg==='ok'){
                                    deferred.resolve(data);
                                  }else{
                                    alert("Get question fail!");
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
  };

}]).controller("AttendanceController",function($scope) {
  var indexData=new Array();
  activeThis('#attendanceli');
  $scope.getAttendance=function() {
    progress.setProgress(20);
    var batch=$('#batchInput').val(),course=$('#courseInput').val();
    $.ajax({
              type :"get",
              async:false,
              url : config.url.checkAttendance,
              dataType : "jsonp",
              data: {batch:batch,course:course},
              success : function(data){
                $scope.attendance=data;
                progress.setProgress(100);
              },
              error:function(){
                  alert("Can't connet to server!");
              }
          });
  };
  $scope.addAttendance=function(index,$event) {
    var html=$($event.target).html();
    if(html==='Add'){
      indexData.push(index);
      $($event.target).html("+1 Click to Cancel");
      $($event.target).removeClass("btn-danger");
      $($event.target).addClass("btn-success");
    }else{
      var deleteindex=0
      for (var i = indexData.length - 1; i >= 0; i--) {
        if(indexData[i]===index){
          deleteindex=i;
          break;
        }
      }
      indexData.splice(deleteindex,1);
      $($event.target).html("Add");
      $($event.target).removeClass("btn-success");
      $($event.target).addClass("btn-danger");
    }
  }
  $scope.sendAttendance=function() {
    var confirmStr="Follow Student is here:\n";
    for (var i = indexData.length - 1; i >= 0; i--) {
      confirmStr+=$scope.attendance.table[indexData[i]].uname+"\n";
    };
    if(confirm(confirmStr)){
      var sendData=Array();
      var addData=Array();
      for (var i = indexData.length - 1; i >= 0; i--) {
        addData=Array();
        addData[0]=$scope.attendance.table[indexData[i]].uid;
        addData[1]=$scope.attendance.table[indexData[i]].course;
        addData[2]=$scope.attendance.table[indexData[i]].batch;
        sendData.push(addData);
      };
      //alert(JSON.stringify(sendData));
      $.ajax({
                type :"get",
                async:false,
                url : config.url.addAttendance,
                dataType : "jsonp",
                data: {values:JSON.stringify(sendData)},
                success : function(data){
                  if (data.msg==='ok') {
                    alert("Save Attendance success!");
                    indexData=Array();
                    progress.setProgress(100);
                    for (var i = indexData.length - 1; i >= 0; i--) {
                      $scope.attendance.table[indexData[i]]['Attendance Times']++;
                    };
                  };
                },
                error:function(){
                    alert("Can't connet to server!");
                }
            });
    }else{

    }
  };
})
.controller("AboutController",function($scope) {
  activeThis('#aboutli');
}).controller("AddQuestionController",function($scope) {
  activeThis('#addquestionli');
  $scope.addquestion=function() {
    var questionId=$("#questionId").val();
    var question=$("#question").val();
    var ans1=$("#ans1").val();
    var ans2=$("#ans2").val();
    var ans3=$("#ans3").val();
    var ans4=$("#ans4").val();
    var correct=$('input[name="correctop"]:checked').val();
    var questionData=Array();
    var sendquestionData=Array();
    questionData.push(questionId,question,ans1,ans2,ans3,ans4,correct);
    sendquestionData.push(questionData);
    progress.setProgress(20);
    $.ajax({
              type :"get",
              async:false,
              url : config.url.addQuestion,
              dataType : "jsonp",
              data: {opt:"add",values:JSON.stringify(sendquestionData)},
              success : function(data){
                progress.setProgress(100);
                if(data.msg==='ok'){
                  alert("Add question success!");
                }else{
                  alert("Add question fail!");
                }
              },
              error:function(){
                  progress.setProgress(100);
                  alert("Can't connet to server!");
              }
          });
  };
}).controller("QuestionController",['$scope','question',function($scope,question) {
  activeThis('#questionli');
  $scope.question=question;
}]);
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


