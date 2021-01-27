const express = require('express');
const {addEmployee, 
       getAllEmployees, 
       getEmployee,
       updateEmployee,
       deleteEmployee
      } = require('../controllers/testController');

const router = express.Router();

router.post('/addemployee', addEmployee);
router.get('/getallEmployees', getAllEmployees);
router.get('/OneEmployee/:id', getEmployee);
router.put('/UpdateEmployee/:id', updateEmployee);
router.delete('/employeeDeleted/:id', deleteEmployee);


module.exports = {
    routes: router
}