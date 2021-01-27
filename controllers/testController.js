'use strict';

const firebase = require('../db');
const Employee = require('../models/test');
const firestore = firebase.firestore();


const addEmployee = async (req, res, next) => {
    try {
        const data = req.body;
        //await firestore.collection('employees').add(req.body);
        await firestore.collection('employees').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllEmployees = async (req, res, next) => {
    try {
        const employers = await firestore.collection('employees');
        const data = await employers.get();
        const employeeArray = [];
        if(data.empty) {
            res.status(404).send('No employee record found');
        }else {
            data.forEach(doc => {
                const employee = new Employee(
                    doc.id,
                    doc.data().fullName,
                    doc.data().empCode,
                    doc.data().position,
                    doc.data().mobile,
                );
                employeeArray.push(employee);
            });
            res.send(employeeArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        const employee = await firestore.collection('employees').doc(id);
        const data = await employee.get();
        if(!data.exists) {
            res.status(404).send('Employee with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEmployee = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const employee =  await firestore.collection('employees').doc(id);
        await employee.update(data);
        res.send('Employee record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteEmployee = async (req, res, next) => {
    console.log(req.params.id);
    try {
        const id = req.params.id;
        await firestore.collection('employees').doc(id).delete();
        //await firestore.doc('employees/' + id).delete();

        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addEmployee,
    getAllEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee
}