let mysql = require('mysql');

let connection=mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    port:'3306',
    database:'xuanke',
    multipleStatements: true
});

//学生注册
exports.insert_student=function(student_params,callback){
    let  student_insert_sql = 'INSERT INTO student(id,name,class,sex,password) VALUES(?,?,?,?,?)';
    connection.query(student_insert_sql,student_params,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
        }
        callback(err,result);
    })
}

//登录验证
exports.do_denglu=function(status,id,callback){
    let  userGetSql = 'SELECT password FROM '+status+' WHERE id = "'+id+'"';
    connection.query(userGetSql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }        
        callback(err,result);
    });
}

//查找所有
exports.searchAll=function(status,callback){
    let  userGetSql = 'SELECT * FROM '+status+'';
    connection.query(userGetSql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }        
        callback(err,result);
    });
}

//根据课程名模糊查找课程
exports.student_chaxun_course=function(class_name,callback){
    let  userGetSql = 'SELECT * FROM course WHERE class_name like "%'+class_name+'%"';
    connection.query(userGetSql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }        
        callback(err,result);
    });
}


//根据id查找对应人物的全部属性
exports.searchById=function(status,id,callback){
    let  userGetSql = 'SELECT * FROM '+status+' WHERE id = "'+id+'"';
    connection.query(userGetSql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }        
        callback(err,result);
    });
}


//更新学生的信息
exports.student_update=function(student_params,callback){
    let user_update_Sql = 'UPDATE student SET name = ?,class = ?,sex = ?,password = ? WHERE Id = ? ';
    connection.query(user_update_Sql,student_params,function(err,result){
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        callback(err,result);
    })
}

//查询该生所选的所有课
exports.student_course=function(student_id,callback){
    let  userGetSql = 'SELECT * FROM course inner join xuanke WHERE xuanke.id = "'+student_id+'" and xuanke.class_id = course.class_id';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('SELETE ERROR] - ',err.message);
            return;
        }
        callback(err,result);
    })
}

//学生选课
exports.student_insert_course=function(xuanke_params,callback){
    let student_insert_sql = 'INSERT INTO xuanke(class_id,id,score) VALUES(?,?,"未录入")';
    connection.query(student_insert_sql,xuanke_params,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
        }
        callback(err,result);
    })
}

//删除学生已选课程
exports.student_delete_course=function(student_id,class_id,callback){
    let delete_sql='DELETE FROM xuanke WHERE class_id ="'+class_id+ '"AND id = "'+student_id+'"';
    connection.query(delete_sql,function(err,result){
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
        }
        callback(err,result);
    })
}

//根据课程号查询选课情况
exports.teacher_chaxun_course=function(class_id,callback){
    let  userGetSql = 'SELECT * FROM course inner join xuanke,student WHERE xuanke.class_id = "'+class_id+'" and xuanke.id = student.id and xuanke.class_id = course.class_id';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('SELETE ERROR] - ',err.message);
            return;
        }
        callback(err,result);
    })
}

//根据教师号显示学生的情况
exports.teacher_score=function(session_id,callback){
    let  userGetSql = 'SELECT course.*,student.*,xuanke.* FROM course inner join xuanke,student,teacher WHERE xuanke.id = student.id and xuanke.class_id = course.class_id and teacher.name =course.class_teacher and teacher.id= "'+session_id+'"';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('SELETE ERROR] - ',err.message);
            return;
        }
        callback(err,result);
    })
}

//更新学生的成绩
exports.score_save=function(student_params,callback){
    let user_update_Sql = 'UPDATE xuanke SET score = ? WHERE class_id = ? AND id = ? ';
    connection.query(user_update_Sql,student_params,function(err,result){
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
        }
        callback(err,result);
    })
}

//根据学号查询选课情况
exports.admin_chaxun_student=function(id,callback){
    let  userGetSql = 'SELECT * FROM course inner join xuanke,student WHERE xuanke.id = "'+id+'" and xuanke.class_id = course.class_id and xuanke.id = student.id';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('SELETE ERROR] - ',err.message);
            return;
        }
        callback(err,result);
    })
}

//删除学生已选课程（从教师方面）
exports.teacher_delete_student=function(student_name,class_id,callback){
    let delete_sql='DELETE xuanke FROM xuanke inner join student WHERE xuanke.class_id ="'+class_id+ '"AND student.name = "'+student_name+'" and student.id = xuanke.id';
    connection.query(delete_sql,function(err,result){
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
        }
        callback(err,result);
    })
}

//更新教师的信息
exports.teacher_update=function(teacher_params,callback){
    let user_update_Sql = 'UPDATE teacher SET name = ?,rank = ?,password = ? WHERE Id = ? ';
    connection.query(user_update_Sql,teacher_params,function(err,result){
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        callback(err,result);
    })
}


//管理员添加教师信息
exports.insert_teacher=function(teacher_params,callback){
    let  teacher_insert_sql = 'INSERT INTO teacher(id,name,rank,password) VALUES(?,?,?,?)';
    connection.query(teacher_insert_sql,teacher_params,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
        }
        callback(err,result);
    })
}

//管理员添加课程信息
exports.insert_course=function(course_params,callback){
    let  course_insert_sql = 'INSERT INTO course(class_id,class_name,class_score,class_time,class_room,class_teacher) VALUES(?,?,?,?,?,?)';
    connection.query(course_insert_sql,course_params,function(err,result){
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
        }
        callback(err,result);
    })
}

//更新管理员的信息
exports.admin_update=function(admin_params,callback){
    let user_update_Sql = 'UPDATE admin SET password = ? WHERE Id = ? ';
    connection.query(user_update_Sql,admin_params,function(err,result){
        if(err){
            console.log('[UPDATE ERROR] - ',err.message);
            return;
        }
        callback(err,result);
    })
}

//管理员查询所有课程
exports.admin_all_course=function(callback){
    let  userGetSql = 'SELECT * FROM course';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('SELETE ERROR] - ',err.message);
            return;
        }
        callback(err,result);
    })
}

//管理员删除课程
exports.admin_delete=function(class_id,callback){
    let delete_sql='DELETE xuanke,course FROM xuanke,course WHERE xuanke.class_id="'+class_id+'" AND course.class_id = "'+class_id+'"';
    connection.query(delete_sql,function(err,result){
        if(err){
            console.log('[DELETE ERROR] - ',err.message);
        }
        callback(err,result);
    })
}