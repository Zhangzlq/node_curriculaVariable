let express=require('express');
let app=express();
let router=require('./routers/routers.js')
let ejs=require('ejs');
let session=require('express-session');

//使用session
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}));

app.use(express.static("./public"));

//模板引擎
app.set("view engine","ejs");

//首页
app.get("/",router.show_index);


//学生登录
app.get("/student_denglu",router.show_student_denglu);
app.post('/do_student_denglu',router.do_student_denglu);


//学生注册
app.get("/student_zhuce",router.show_student_zhuce);
app.post('/do_student_zhuce',router.do_student_zhuce);


//教师登录
app.get("/teacher_denglu",router.show_teacher_denglu);
app.post('/do_teacher_denglu',router.do_teacher_denglu);


//管理员登录
app.get("/admin_denglu",router.show_admin_denglu);
app.post('/do_admin_denglu',router.do_admin_denglu);

//学生选课
app.get('/student_xuanke',router.show_student_xuanke)
app.post('/student_get_course',router.student_get_course)
app.post('/student_insert_course',router.student_insert_course)
app.post('/student_delete_course',router.student_delete_course)


//取得课程
app.get('/student_kecheng',router.show_student_kecheng)
app.post("/get_course", router.get_course);
app.post('/student_chaxun_course',router.student_chaxun_course);

//学生信息修改
app.get('/student_xinxixiugai',router.show_student_xinxixiugai)
app.post('/student_search_by_session',router.student_search_by_session);
app.post('/student_xinxigengxin',router.student_xinxigengxin);

//教师查询选课情况
app.get('/teacher_course',router.show_teacher_course);
app.post('/teacher_score',router.teacher_score);
app.post('/score_save',router.score_save);

app.post('/teacher_chaxun_course',router.teacher_chaxun_course)
app.post('/teacher_delete_student',router.teacher_delete_student)

//教师信息修改
app.get('/teacher_xinxixiugai',router.show_teacher_xinxixiugai);
app.post('/teacher_search_by_session',router.teacher_search_by_session);
app.post('/teacher_xinxigengxin',router.teacher_xinxigengxin);

//管理员查询选课情况
app.get('/admin_course',router.show_admin_course);
app.get('/admin_student',router.show_admin_student);
app.post('/get_all_student',router.get_all_student);
app.post('/admin_chaxun_student',router.admin_chaxun_student);

//管理员添加教师
app.get('/admin_insert_teacher',router.show_admin_insert_teacher);
app.post('/admin_teacher',router.admin_teacher)

//管理员添加课程
app.get('/admin_insert_course',router.show_admin_insert_course);
app.post('/admin_course',router.admin_course)

//管理员删除课程
app.get('/admin_delete_course',router.show_admin_delete_course)
app.post('/admin_all_course',router.admin_all_course);
app.post('/admin_delete',router.admin_delete);

//管理员修改自身信息
app.get('/admin_xinxixiugai',router.show_admin_xinxixiugai)
app.post('/admin_search_by_session',router.admin_search_by_session);
app.post('/admin_xinxigengxin',router.admin_xinxigengxin);

//使用session
app.get('/get_session',router.get_session);

//清除session
app.get('/clear_session',router.clear_session);

console.log("Server running");

app.listen(3000);