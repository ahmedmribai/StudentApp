const Student = require('../models/student.model');

exports.create = (req, res) => {
    const student = new Student({
        firstName     : req.body.firstName,
        lastName      : req.body.lastName,
        birthDate     : req.body.birthDate  ,
        email         : req.body.email,
        password      : req.body.password,
        classroom     : req.body.classroom,
        registerNumber: req.body.registerNumber
    });

    if(!student.firstName) return res.status(404).send('enter the student first Name');
    if(!student.lastName) return res.status(404).send('enter the student last Name');
    if(!student.birthDate) return res.status(404).send('enter the student birthdate');
    if(!student.email) return res.status(404).send('enter the student email');
    if(!student.password) return res.status(404).send('enter the student password');
    if(!student.classroom) return res.status(404).send('enter the student classroom Name');
    if(!student.registerNumber ||typeof(student.registerNumber)!= 'number') return res.status(404).send('enter the student number in the class');

    student.save()
    .then(data =>{
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "some error occured"
        });
    });
};
exports.findAll = (req, res) =>{
    Student.find()
    .then(student =>{
        res.send(student);
    }).catch(err =>{
        res.status(500).send({
            message: err.message || "some error occured"
        });
    });
};
exports.findOne = (req, res) =>{
    Student.findById(req.params.studentId)
    .then(student =>{
        if(!student){
            return res.status(404).send({
                message : "student not found with id " + req.params.studentId
            });
        }
        res.send(student);
    }).catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "student not found with id " + req.params.studentId 
            });
        }
        return res.status(500).send({
            message: 'error rtrieving student with id ' + req.params.studentId
        });
    });
};

const filterin_data = (studentField, bodyField) => {
    if (bodyField) {
        return bodyField;
    }
    return studentField;
}

exports.update = (req, res) =>{
    Student.findById(req.params.studentId)
        .then(data =>{
            student = data;

            student.firstName = filterin_data(student.firstName, req.body.firstName);
            student.lastName = filterin_data(student.lastName, req.body.lastName);
            student.birthDate = filterin_data(student.birthDate, req.body.birthDate);
            student.email = filterin_data(student.email, req.body.email);
            student.password = filterin_data(student.password, req.body.password);
            student.classroom = filterin_data(student.classroom, req.body.classroom);
            student.registerNumber = filterin_data(student.registerNumber, req.body.registerNumber);

            Student.findByIdAndUpdate(req.params.studentId, student, {new: true})
                .then(student => {
                    if(!student) {
                        return res.status(404).send({
                            message: "student not found with id " + req.params.studentId
                        });
                    }
                    res.send(student);
                }).catch(err => {
                    if(err.kind === 'ObjectId') {
                        return res.status(404).send({
                            message: "student not found with id " + req.params.studentId
                        });                
                    }
                    return res.status(500).send({
                        message: "Error updating student with id " + req.params.studentId
                    });
                }); 
                    
            })
            .catch( err => res.status(404).send(err));
    
        Student.findByIdAndUpdate(req.params.studentId, {
        firstName     : req.body.firstName,
        lastName      : req.body.lastName,
        birthDate     : req.body.birthDate,
        email         : req.body.email,
        password      : req.body.password,
        classroom     : req.body.classroom,
        registerNumber: req.body.registerNumber        
        }, {new: true})
        .then(student => {
            if(!student) {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });
            }
            res.send(student);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "student not found with id " + req.params.studentId
                });                
            }
            return res.status(500).send({
                message: "Error updating student with id " + req.params.studentId
            });
        }); 
        
    };