import { useState, useEffect } from "react"
import axios from "axios"

function App() {

const [employees,setEmployees] = useState([])

const [form,setForm] = useState({
  employee_id:"",
  name:"",
  email:"",
  department:""
})

const fetchEmployees = async ()=>{
  try{
    const res = await axios.get("http://127.0.0.1:8000/employees")
    setEmployees(res.data)
  }catch(error){
    console.log(error)
  }
}

useEffect(()=>{
  fetchEmployees()
},[])

const handleChange = (e)=>{
  setForm({...form,[e.target.name]:e.target.value})
}

const addEmployee = async ()=>{
  try{

    await axios.post("http://127.0.0.1:8000/employees",form)

    setForm({
      employee_id:"",
      name:"",
      email:"",
      department:""
    })

    fetchEmployees()

  }catch(error){
    console.log(error)
  }
}

const deleteEmployee = async(id)=>{
  try{
    await axios.delete(`http://127.0.0.1:8000/employees/${id}`)
    fetchEmployees()
  }catch(error){
    console.log(error)
  }
}

const markAttendance = async(empid)=>{

  try{

    await axios.post("http://127.0.0.1:8000/attendance",{
      employee_id: empid,
      date: new Date().toISOString().split("T")[0],
      status: "Present"
    })

    alert("Attendance Marked")

  }catch(error){
    console.log(error)
  }

}

return (

<div style={{padding:"40px"}}>

<h1>HRMS Employee System</h1>

<input
name="employee_id"
placeholder="Employee ID"
value={form.employee_id}
onChange={handleChange}
/>

<input
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
/>

<input
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
/>

<input
name="department"
placeholder="Department"
value={form.department}
onChange={handleChange}
/>

<button onClick={addEmployee}>Add Employee</button>

<h2>Employee List</h2>

<table border="1" cellPadding="10">

<thead>
<tr>
<th>ID</th>
<th>Employee ID</th>
<th>Name</th>
<th>Email</th>
<th>Department</th>
<th>Action</th>
<th>Attendance</th>
</tr>
</thead>

<tbody>

{employees.map((emp)=>(
<tr key={emp.id}>
<td>{emp.id}</td>
<td>{emp.employee_id}</td>
<td>{emp.name}</td>
<td>{emp.email}</td>
<td>{emp.department}</td>

<td>
<button onClick={()=>deleteEmployee(emp.id)}>Delete</button>
</td>

<td>
<button onClick={()=>markAttendance(emp.employee_id)}>
Mark Present
</button>
</td>

</tr>
))}

</tbody>

</table>

</div>
)

}

export default App