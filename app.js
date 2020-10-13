// dependencies
const inquirer = require('inquirer')
const mysql = require('mysql')
const cTable = require('console.table')

const connection = mysql.createConnection({
    user: 'root',
    password: 'password',
    port: 3306,
    host: 'localhost',
    database: 'employee_db',
})

connection.connect(err => {
    if (err) console.log(err)
    console.log('Connection to database successful!')
    initPrompts()
})

function initPrompts() {
    inquirer.prompt([
        {
            name: 'userChoice',
            type: 'list',
            message: 'Please choose one of the following...',
            choices: [
                'Add Employee',
                'Add Role',
                "Add Department",
                'View Employees',
                'View Roles',
                'View Departments',
                'Update Employee Roles',
                'Quit'
            ]
        }
    ])
    .then(res => {
        switch (res.userChoice) {
            case 'Add Department':
                addDepts();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View Departments':
                listDepartments()
                break;
            case 'View Roles':
                listRoles()
                break;
            case 'View Employees':
                listEmployees()
                break;
            case 'Update Employee Roles':
                empUpdate();
                break;
            default:
                connection.end()
                process.exit()
        }
    })
}

// function to sort employees by name
// function listEmployees() {
//     let sortNameArr = []
//     connection.query(
//         `CREATE TABLE sortName LIKE employee INSERT sortName SELECT * FROM employee ALTER TABLE sortName CHANGE COLUMN id id AFTER last_name ALTER TABLE sortName CHANGE COLUMN last_name last_name FIRST SELECT * FROM sortName ORDER BY last_name, firstname, role_id;`,
//         function(err, res) {
//             if (err) console.log(err) err
//             sortNameArr.push(res)
//             console.table(sortNameArr)
//             initPrompts();
//         }
//     )
// }
// function listEmployees() {
//     inquirer.prompt([
//         {
//             name: 'sortChoice',
//             type: 'list',
//             message: 'Sort by:',
//             choices: [
//                 'Name',
//                 'Department',
//                 'ID'
//             ]
//         }
//     ])
//     .then(ans => {
//         switch (ans.sortChoice) {
//             case 'Name'
//         }
//     })
// }

// function to view all employees
function listEmployees() {
    connection.query(`SELECT * FROM employee ORDER BY last_name, first_name, id`, function (err, res) {
        if (err) console.log(err);
        console.table(res)
        initPrompts();
    })
}

// function to view all roles
function listRoles() {
    connection.query(`SELECT * FROM role ORDER BY department_id`, function(err, res) {
        if (err) console.log(err);
        console.table(res)
        initPrompts()
    })
}

// function to view all depts
function listDepartments() {
    connection.query(`SELECT * FROM department ORDER BY id`, function (err, res) {
        if (err) console.log(err);
        console.table(res)
        initPrompts()
    })
}

// function to add employee to database
function addEmployee() {
    let roleArr = []
    connection.query(`SELECT title FROM role`, function(err, res) {
        if (err) console.log(err)
        for (let i = 0; i < res.length; i++) {
            roleArr.push(res[i].title)
        }
    })
    inquirer.prompt([
        {
            name: 'first_name',
            type: 'input',
            message: "Enter employee's first name:",
            validate: function(res) {
                if (res.length == 0) {
                    return 'You must enter a first name!'
                } else {
                    return true
                }
            }
        },
        {
            name: 'last_name',
            type: 'input',
            message: "Enter employee's last name:",
            validate: function(res) {
                if (res.length == 0) {
                    return 'You must enter a last name!'
                } else {
                    return true
                }
            }
        },
        {
            name: 'title',
            type: 'list',
            message: 'Choose a role:',
            choices: roleArr
        },
        {
            name: 'isManager',
            type: 'confirm',
            message: 'Is the employee a manager?'
        }
    ])
    .then((initUserInputs) => {
        if (err) console.log(err)
        let convertToID
        connection.query(`SELECT id, title FROM role`, function(err, idQueryRes) {
            if (err) console.log(err)
            for (var i = 0; i < idQueryRes.length; i++) {
                convertToID = idQueryRes[i].id
                // console.log(idQueryRes[i])
            }
            if (initUserInputs.isManager) {
                inquirer.prompt([
                    {
                        name: 'addManager',
                        type: 'input',
                        message: 'Please assign 5 digit manager ID:',
                        validate: function(res) {
                            if (res.length < 5 || res.length > 5 || isNaN(res) === true) {
                                return 'Please enter a valid 5 digit ID'
                            } else {
                                return true;
                            }
                        }
                    }
                ])
                .then((assignNewMgrIdInput) => {
                    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [initUserInputs.first_name, initUserInputs.last_name, convertToID, assignNewMgrIdInput.addManager],
                    function(err, res) {
                        if (err) console.log(err)
                        console.log("Manager successfully added!")
                        initPrompts()
                    })
                })
            } else {
            let managerArr = []
                connection.query(`SELECT manager_id FROM employee WHERE manager_id IS NOT NULL`, function(err, mgrIdQueryRes) {
                    if (err) console.log(err)
                    for (var i = 0; i < mgrIdQueryRes.length; i++) {
                        managerArr.push(String(mgrIdQueryRes[i].manager_id))
                }
            })
                inquirer.prompt([
                    {
                        name: 'assignManager',
                        type: 'input',
                        message: 'Please enter the managerID number of the manager this employee will be assigned to:',
                        validate: function(res) {
                            // console.log(managerArr)
                            // console.log(res.toString().length)
                            // console.log(managerArr.indexOf(res))
                            if (res.toString().length !== 5 || managerArr.indexOf(res) === -1) {
                                return 'Please enter a valid 5 digit ID'
                            } else {
                                return true
                            }
                        }
                    }
                ])
                .then((assignedMgrId) => {
                    connection.query(`INSERT INTO employee (first_name, last_name, role_id, managedBy_id) VALUES (?,?,?,?)`, [initUserInputs.first_name, initUserInputs.last_name, convertToID, assignedMgrId.managedBy_id])
                    console.log('Employee successfully added!')
                    initPrompts()
                })
            }
        })
    })
}

// function to add roles
function addRole() {
    let deptArr = []
    connection.query(`SELECT name FROM department`, function(err, res) {
        if (err) console.log(err)
        for (let i = 0; i < res.length; i++) {
            deptArr.push(res[i].name)
            // console.log(res[i].name)
        }
        console.log(deptArr)
    })
    inquirer.prompt([
        {
            name: 'newRoleName',
            type: 'input',
            message: 'Enter title of new role:',
            validate: function(res) {
                if (res.length == 0) {
                    return 'You must enter a title!'
                } else {
                    return true
                }
            }
        },
        {
            name: 'salary',
            type: 'input',
            message: 'Enter default salary (per year):'
        },
        {
            name: 'whatDept',
            type: 'list',
            message: 'Assign new role to a department:',
            choices: deptArr,
        }
    ])
    .then((res) => {
        let convertToDeptId
        connection.query(`SELECT id, name FROM department`, function(err, res) {
            if (err) console.log(err)
            for (var i = 0; i < res.length; i++) {
                convertToDeptId = res[i].id
                console.log('post loop', res[i].id)
            }
        })
        connection.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [res.newRoleName, res.salary, convertToDeptId]), function(err, res) {
            if (err) console.log(err)
            console.log('converted dept id', convertToDeptId)
            console.log(`Role successfully added!`)
            initPrompts()
        }
    })
}

// function to add departments
function addDepts() {
    console.log('im here')
    inquirer.prompt([
        {
            name: 'newDeptName',
            type: 'input',
            message: 'Enter desired department name:',
            validate: function(res) {
                if (res.length == 0) {
                    return 'You must enter a title!'
                } else {
                    return true
                }
            }
        }
    ])
    .then((res) => {
        connection.query(`INSERT INTO department SET ?`, { name: res.newDeptName }, function(err, res) {
            if (err) console.log(err)
            console.log('Department successfully added!')
            initPrompts()
        })
    })
}

// function to update employee data
function empUpdate() {
    let roleToId = 
    connection.query(`SELECT last_name, first_name, id FROM employee ORDER BY last_name, first_name, id`, function(err, nameQuery) {
        if (err) console.log(err)
        inquirer.prompt([
            {
                name: 'empToUpdate',
                type: 'list',
                message: 'Select employee to update:',
                choices: function() {
                    let tempempNameArr = []
                    for (let i = 0; i < nameQuery.length; i++) {
                        tempempNameArr.push(nameQuery[i].last_name + " , " + nameQuery[i].first_name + " ... id#: " + nameQuery[i].id)
                    }
                    return tempempNameArr
                }
            }
        ])
        .then((empChoice) => {
            console.log('chosens name?', empChoice.empToUpdate)
            let splitName = empChoice.empToUpdate.split(' ')
            let lastName = splitName[0]
            let idNum = Number(splitName[5])
            console.log('using this name', lastName, idNum)
            connection.query(`SELECT title, id FROM role ORDER BY title`, function(err, roleQuery) {
                if (err) console.log(err)
                inquirer.prompt([
                    {
                        name: 'empNewRole',
                        type: 'list',
                        message: 'Assign new role:',
                        choices: function() {
                            let roleArr = []
                            for (let i = 0; i < roleQuery.length; i++) {
                                roleArr.push(roleQuery[i].title)
                            }
                            return roleArr
                        }
                    }
                ])
       
                
                // .then((roleChoice) => {
                //     connection.query(`SELECT id FROM role WHERE title = ${roleChoice.empNewRole}`, function(err, roleIdQuery) {
                //         if (err) console.log(err)
                //         connection.query(`SELECT id FROM employee WHERE last_name = ${lastName} AND id = ${idNum}`, function(err, res) {
                //             if (err) console.log(err)
                //             console.log('employees id and lastname match', res)
                //             connection.query(`UPDATE employee SET`)
                //         })

                //     })
                    
                // })
            })
        })
    })
}

