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
            }).when('/result', {
                templateUrl: 'temp/result.html',
                controller: 'ResultController'
            }).when('/attendance', {
                templateUrl: 'temp/attendance.html',
                controller: 'AttendanceController'
            }).when('/examlist', {
                templateUrl: 'temp/examlist.html',
                controller: 'ExamlistController',
                    resolve:{
                  exam:['$q',function($q) {
                    var deferred=$q.defer();
                    progress.setProgress(20);
                      $.ajax({type :"get",async:true,url : config.url.exam,dataType : "jsonp",
                            jsonpCallback:"success_jsonpCallback",//×Ô¶¨ÒåµÄjsonp»Øµ÷º¯ÊýÃû³Æ£¬Ä¬ÈÏÎªjQuery×Ô¶¯Éú³ÉµÄËæ»úº¯ÊýÃû
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
            .when('/course', {
                templateUrl: 'temp/Course.html',
                controller: 'CourseController',
                resolve:{
              course:['$q',function($q) {
                var deferred=$q.defer();
                progress.setProgress(20);
                  $.ajax({type :"get",async:true,url : config.url.course,dataType : "jsonp",
                        jsonpCallback:"success_jsonpCallback",//×Ô¶¨ÒåµÄjsonp»Øµ÷º¯ÊýÃû³Æ£¬Ä¬ÈÏÎªjQuery×Ô¶¯Éú³ÉµÄËæ»úº¯ÊýÃû
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
            }).when('/nav', {
                templateUrl: 'temp/nav.html',
                controller: 'navController'
            })
            .when('/exam', {
                templateUrl: 'temp/exam.html',
                controller: 'ExamController'
            })
            .when('/about', {
                templateUrl: 'temp/about.html',
                controller: 'AboutController'
            })
            .when('/addquestion', {
                templateUrl: 'temp/addquestion.html',
                controller: 'AddQuestionController'
            }).when('/testpaperlist', {
                templateUrl: 'temp/testpaperlist.html',
                controller: 'TestPaperController',
                    resolve:{
                  testlist:['$q',function($q) {
                    var deferred=$q.defer();
                    progress.setProgress(20);
                      $.ajax({
                                type :"get",
                                async:false,
                                url : config.url.testmake,
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
          .when('/studentexamlist', {
                templateUrl: 'temp/studentexamlist.html',
                controller: 'StudentExamlistController',
                    resolve:{
                  studentexam:['$q',function($q) {
                    var deferred=$q.defer();
                    progress.setProgress(20);
                      $.ajax({
                                type :"get",
                                async:false,
                                url : config.url.stuexam,
                                dataType : "jsonp",
                                data: {opt:"getexam"},
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
            .when('/maketest', {
                templateUrl: 'temp/maketestpaper.html',
                controller: 'MaketestpaperController',
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

}).controller("ResultController",function($scope) {
  activeThis('#resultli');
  $scope.getReport=function() {
    var examid=$('#examid').val();
    $.ajax({
          type :"get",
          async:false,
          url : config.url.examReport,
          dataType : "jsonp",
          data: {examid:examid},
          success : function(data){
            if(data.msg==='error'){
              alert("Get Report fail!");
            }
            if(data.msg==='ok'){
              $scope.report=data;
            }
          },
          error:function(){
              alert("Can't connet to server!");
          }
      });
  };
})
.controller("navController",function($scope) {
})
.controller("HomeController",function($scope) {
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
.controller("ExamController",function($scope) {
  activeThis('#examli');
  $scope.now=getNowFormatDate();
  $('#begintime').datetimepicker();
  $('#endtime').datetimepicker();
  $scope.addExam=function() {
    var examid=$('#examid').val();
    var testid=$('#testid').val();
    var keycode=$('#keycode').val();
    var begintime=$('#begintime').val();
    var endtime=$('#endtime').val();
    var exam=Array();
    var sendexamData=Array();
    exam.push(examid,testid,begintime,endtime,keycode);
    sendexamData.push(exam);
    progress.setProgress(20);
    $.ajax({
              type :"get",
              async:true,
              url : config.url.exam,
              dataType : "jsonp",
              data: {opt:'add',values:JSON.stringify(sendexamData)},
              success : function(data){
                if(data.msg==='ok'){
                  progress.setProgress(100);
                  alert("Add Exam success");
                }else{
                  progress.setProgress(100);
                  alert("Add Exam fail");
                }
              },
              error:function(){
                  progress.setProgress(100);
                  alert("Can't connet to server!");
              }
          });
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
}).controller("ExamlistController",['$scope','exam',function($scope,exam) {
  activeThis('#examlistli');
  $scope.exam=exam;
}])
.controller("StudentExamlistController",['$scope','studentexam',function($scope,studentexam) {
  activeThis('#studentexamlistli');
  $scope.studentexam=studentexam;
  $scope.enterExam=function(index) {
    var exid=$scope.studentexam.table[index].exid;
    window.open("takeExam.html?exid="+exid);
  };
}])
.controller("QuestionController",['$scope','question',function($scope,question) {
  activeThis('#questionli');
  $scope.question=question;
}]).controller("TestPaperController",['$scope','testlist',function($scope,testlist) {
  activeThis('#testpaperlistli');
  $scope.testlist=testlist;
}]).controller("MaketestpaperController",['$scope','question',function($scope,question) {
  activeThis('#maketestli');
  $scope.question=question;
  var indexData=Array();
  $scope.selectquestion=function(index,$event){
    if($($event.target).html()==='Not Select'){
      indexData.push(index);
      $($event.target).removeClass("btn-primary");
      $($event.target).addClass("btn-success");
      $($event.target).html("Selected");
    }else{
      var deleteindex=0
      for (var i = indexData.length - 1; i >= 0; i--) {
        if(indexData[i]===index){
          deleteindex=i;
          break;
        }
      }
      indexData.splice(deleteindex,1);
      $($event.target).addClass("btn-primary");
      $($event.target).removeClass("btn-success");
      $($event.target).html("Not Select");
    }
  };
  $scope.sendTestData=function() {
    var testid=$('#testid').val();
    if(testid.replace(/[]/g,"")===''){
      alert("Please enter test ID!");
    }else{
      var sendTestData=Array();
      for (var i = indexData.length - 1; i >= 0; i--) {
        var testQuest=Array();
        testQuest.push(testid);
        testQuest.push($scope.question.table[indexData[i]].queid);
        sendTestData.push(testQuest);
      };
      // alert(JSON.stringify(sendTestData));
      $.ajax({
          type :"get",
          async:false,
          url : config.url.testmake,
          dataType : "jsonp",
          data: {opt:'add',values:JSON.stringify(sendTestData)},
          success : function(data){
            if(data.msg==='ok'){
              alert("Add Test paper success!");
            }else{
              alert("Add Test paper fail!");
            }
          },
          error:function(){
              alert("Can't connet to server!");
          }
      });
    }
  };
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


