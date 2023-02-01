const DB=require("./DbConnection.js")
const Prevention = require("sqlstring")
const moment = require('moment');

const createStudent=(post,res)=>{
    DB.query(`INSERT INTO result(rollNo, name, dob, score)
    VALUE( ${Prevention.escape(post.rollNo)},
        ${Prevention.escape(post.name)},
        ${Prevention.escape(post.dob)},
        ${Prevention.escape(post.score)}) `, (err, result) => {
        if(err) {
            res.redirect("/teacher/studentdetails")
        } else {
            console.log("student data created")
            res.redirect("/")
        }
    })
}

const studentList=(res)=>{
    DB.query(`SELECT * FROM result`,(err,studentData)=>{
        if(err){
            console.log(err)
        }else{
            res.render("studentList",{studentData, moment})
        }
    })
}
const editView=(rollNo,post,res)=>{
    DB.query(`SELECT * FROM result WHERE rollNo = "${rollNo}" LIMIT 1`, (err, studentData) => {
        if(err) {
            console.log(err)
        } else {
            res.render("editStudent", {studentData, moment})
        }
    })
}
const result=(data,res)=>{
    DB.query(`SELECT * FROM result WHERE rollNo = "${data.rollNo}" and name = "${data.name}" LIMIT 1`, (err, result) => {
        if(err) {
            console.log(err)
        } else {
            if(result[0])
            {
                res.render("studentResult", {result, moment})
            }
            else
            {
                res.redirect("/student/searchresult")
            }
            
        }
    })
}
const updateStudent=(rollNo,post,res)=>{
    DB.query(`UPDATE result
    SET rollNo=${Prevention.escape(post.rollNo)},
    name=${Prevention.escape(post.name)},
    dob=${Prevention.escape(post.dob)},
    score=${Prevention.escape(post.score)}
    WHERE rollNo = "${rollNo}" `, (err, studentData) => {
        if(err) {
            console.log(err)
        } else {
            console.log("student record updated")
            res.redirect("/")
        }
    })
}
const deleteStudent=(rollNo,res)=>{
    DB.query(`DELETE FROM result WHERE rollNo = "${rollNo}"`, (err, studentData) => {
        if(err) {
            console.log(err)
        } else {
            console.log("student deleted")
            res.redirect("/")
        }
    })
}
module.exports={createStudent, studentList, editView, updateStudent, deleteStudent, result}