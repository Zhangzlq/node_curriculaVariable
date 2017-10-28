let db = require("../model/db.js");
var formidable = require('formidable');

//首页
exports.show_index = function (req,res,next) {
    res.render("index");
};


//学生登录
exports.show_student_denglu = function (req,res,next) {
    res.render("student_denglu");
};
exports.do_student_denglu=function(req,res,result){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        let password=fields.password;
        db.do_denglu('student',id,function(err,result){
            if(err){
                res.send('-3');     //服务器错误
                return
            }
            if(result.length==0){
                res.send('-1');     //用户不存在
                return
            }
            let dbpassword=result[0].password;
            if(password==dbpassword){
                req.session.user=id;
                res.send('1');      //登录成功
                return;
            }else{
                res.send('-2');     //密码错误
            }
        })
    })
}

//学生注册
exports.show_student_zhuce = function (req,res,next) {
    res.render("student_zhuce");
};
exports.do_student_zhuce=function(req,res,result){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        let name=fields.name;
        let classroom = fields.class;
        let sex=fields.sex;
        let password=fields.password;
        db.insert_student([id,name,classroom,sex,password],function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            // req.session.log='1';
            res.send('1');
        })
    })
}


//教师登录
exports.show_teacher_denglu = function (req,res,next) {
    res.render("teacher_denglu");
};
exports.do_teacher_denglu=function(req,res,result){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        let password=fields.password;
        db.do_denglu('teacher',id,function(err,result){
            if(err){
                res.send('-3');     //服务器错误
                return
            }
            if(result.length==0){
                res.send('-1');     //用户不存在
                return
            }
            let dbpassword=result[0].password;
            if(password==dbpassword){
                req.session.user=id;
                res.send('1');      //登录成功
                return;
            }else{
                res.send('-2');     //密码错误
            }
        })
    })
}

//管理员登录
exports.show_admin_denglu = function (req,res,next) {
    res.render("admin_denglu");
};
exports.do_admin_denglu=function(req,res,result){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        let password=fields.password;
        db.do_denglu('admin',id,function(err,result){
            if(err){
                res.send('-3');     //服务器错误
                return
            }
            if(result.length==0){
                res.send('-1');     //用户不存在
                return
            }
            let dbpassword=result[0].password;
            if(password==dbpassword){
                req.session.user=id;
                res.send('1');      //登录成功
                return;
            }else{
                res.send('-2');     //密码错误
            }
        })
    })
}

//学生选课
exports.show_student_xuanke=function(req,res,next){
    res.render('student_xuanke');
}
exports.student_get_course = function (req, res, next) {
    let session_id=req.session.user;
    db.student_course(session_id, function (err, result) {
        var obj = {"allResult" : result};
        res.json(obj);
    });
};
exports.student_insert_course=function(req,res,next){
    let session_id=req.session.user;
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let class_id=fields.class_id;
        db.student_insert_course([class_id,session_id],function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}
exports.student_delete_course=function(req,res,next){
    let session_id=req.session.user;
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let class_id=fields.class_id;
        db.student_delete_course(session_id,class_id,function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}


//取得课程
exports.show_student_kecheng = function (req,res,next) {
    res.render("student_kecheng");
};
exports.get_course = function (req, res, next) {
    db.searchAll('course', function (err, result) {
        var obj = {"allResult" : result};
        res.json(obj);
    });
}
exports.student_chaxun_course=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let class_name=fields.class_name;
        db.student_chaxun_course(class_name,function(err,result){
            var obj = {"allResult" : result};
            res.json(obj);
        })
    })
}


//学生信息修改
exports.show_student_xinxixiugai=function(req,res,next){
    res.render('student_xinxixiugai');
}
//学生信息更新
exports.student_xinxigengxin=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        let name=fields.name;
        let classroom = fields.class;
        let sex=fields.sex;
        let password=fields.password;
        db.student_update([name,classroom,sex,password,id],function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}

//教师查询选课情况
exports.show_teacher_course=function(req,res,next){
    res.render('teacher_course');
}
exports.teacher_score=function(req,res,next){
    let session_id=req.session.user;
    db.teacher_score(session_id,function(err,result){
        var obj = {"allResult" : result};
        res.json(obj);
    })
}
exports.score_save=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let class_id=fields.class_id;
        let id=fields.id;
        let score=fields.score;
        db.score_save([score,class_id,id],function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}

exports.teacher_chaxun_course=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let class_id=fields.class_id;
        db.teacher_chaxun_course(class_id,function(err,result){
            var obj = {"allResult" : result};
            res.json(obj);
        })
    })
}
exports.teacher_delete_student=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let class_id=fields.class_id;
        let name=fields.name;
        db.teacher_delete_student(name,class_id,function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })

    })
}

//教师信息修改
exports.show_teacher_xinxixiugai=function(req,res,next){
    res.render('teacher_xinxixiugai');
}
//教师信息更新
exports.teacher_xinxigengxin=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        let name=fields.name;
        let rank = fields.rank;
        let password=fields.password;
        db.teacher_update([name,rank,password,id],function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}

//管理员查询选课情况
exports.show_admin_course=function(req,res,next){
    res.render('admin_course');
}
exports.show_admin_student=function(req,res,next){
    res.render('admin_student');
}
exports.admin_chaxun_student=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        db.admin_chaxun_student(id,function(err,result){
            var obj = {"allResult" : result};
            res.json(obj);
        })
    })
}
exports.get_all_student = function (req, res, next) {
    db.searchAll('student', function (err, result) {
        var obj = {"allResult" : result};
        res.json(obj);
    });
};


//管理员添加教师
exports.show_admin_insert_teacher=function(req,res,next){
    res.render('admin_insert_teacher');
}
exports.admin_teacher=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        let name=fields.name;
        let rank=fields.rank;
        let password=fields.password;
        db.insert_teacher([id,name,rank,password],function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}

//管理员添加教师
exports.show_admin_insert_course=function(req,res,next){
    res.render('admin_insert_course');
}
exports.admin_course=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let class_id=fields.class_id;
        let class_name=fields.class_name;
        let class_score=fields.class_score;
        let class_time=fields.class_time;
        let class_room=fields.class_room;
        let class_teacher=fields.class_teacher;
        db.insert_course([class_id,class_name,class_score,class_time,class_room,class_teacher],function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}

//管理员修改自身信息
exports.show_admin_xinxixiugai=function(req,res,next){
    res.render('admin_xinxixiugai');
}
//教师信息更新
exports.admin_xinxigengxin=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let id=fields.id;
        let password=fields.password;
        db.admin_update([password,id],function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}

//管理员删除课程
exports.show_admin_delete_course=function(req,res,next){
    res.render('admin_delete_course')
}
exports.admin_all_course=function(req,res,next){
    db.admin_all_course(function(err,result){
        var obj = {"allResult" : result};
        res.json(obj);
    })
}
exports.admin_delete=function(req,res,next){
    let form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        let class_id=fields.class_id;
        db.admin_delete(class_id,function(err,result){
            if(err){
                res.send('-1');
                return;
            }
            res.send('1');
        })
    })
}


//调用session存储的id
exports.get_session=function(req,res,next){
    res.send(req.session.user);
}
exports.student_search_by_session=function(req,res,next){
    let session_id=req.session.user;
    db.searchById('student',session_id,function(err,result){
        if(err){
            res.send('-1');
            return;
        }
        res.send(result);
    })
}
exports.teacher_search_by_session=function(req,res,next){
    let session_id=req.session.user;
    db.searchById('teacher',session_id,function(err,result){
        if(err){
            res.send('-1');
            return;
        }
        res.send(result);
    })
}
exports.admin_search_by_session=function(req,res,next){
    let session_id=req.session.user;
    db.searchById('admin',session_id,function(err,result){
        if(err){
            res.send('-1');
            return;
        }
        res.send(result);
    })
}

//清除session
exports.clear_session=function(req,res,next){
    req.session.user=null;
}