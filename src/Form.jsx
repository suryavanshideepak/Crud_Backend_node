import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [data, setdata] = useState({
    name: "",
    email: "",
    age: "",
  });
  const [input, setInput] = useState([]);
  const [isToggle, settoggle] = useState(true);
  const [id,setId]=useState("")

  const getapi = async () => {
    const response = await fetch(`http://localhost:4000/user/user`);
    const res = await response.json();
    setInput(res);
    console.log("res",res)
  };

  useEffect(() => {
    getapi();
  }, [data]);

  const inputEvent = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const clicktosubmit = (e) => {
    e.preventDefault();
    if (data.name && data.email && data.age) {
      axios
        .post("http://localhost:4000/user/user", {
          name: data.name,
          email: data.email,
          age: data.age,
        })
        .then(function (response) {
          console.log("post",response);
        })
        .catch(function (error) {
          console.log(error);
        });
      setdata({ name: "", email: "", age:"" });
    }
  };

  
  const clickToDelete = (id) => {
    console.log("hghgv", id);
    axios
      .delete(`http://localhost:4000/user/${id}`)
      .then(function (response) {
        console.log(response);
        getapi()
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  
  const clickToEdit=(id)=>{
    settoggle(false)
    axios.get(`http://localhost:4000/user/${id}`)
    .then(function(response){
      console.log("resssss",response);
      setdata({
        name:response.data.name,
        email:response.data.email,
        age:response.data.age
      })
      setId(response.data._id)
    })
    .catch(function(error){
      console.log(error);
    });
  };

  const clickToUpdate=(e)=>{
    e.preventDefault()
    if(data.name && data.email && data.age){
      axios.post(`http://localhost:4000/user/updateuser`,{
        id:id,
        name:data.name,
        email:data.email,
        age:data.age,
      })
      .then(function(response){
        console.log("resp",response)
      })
      .catch(function(error){
        console.log(error)
      })
      setdata({ name: "", email: "", age:"" });
      settoggle(true);
    }
  }

  return (
    <>
    
       <h1 className="text-center mt-4 text-primary">Crud With backend</h1>
      <form className="my-5">
        <div className="form d-flex justify-content-center align-items-center">
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={inputEvent}
            placeholder="Enter Your Name"
          />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={inputEvent}
            placeholder="Enter your Email"
          />
          <input
            type="age"
            name="age"
            value={data.age}
            onChange={inputEvent}
            placeholder="Enter Your Age"
          />
          <br />
          <br />
          {isToggle ?<button className="btn btn-success" onClick={clicktosubmit}>Add</button>:
           <button className="btn btn-success" onClick={clickToUpdate}>update</button>}
        </div>
      </form>
      <div className='container table-res'>
        <table className='table table-hover'>
          <thead className='thead-dark'>
            <tr className="bg-secondary">
              <th className="text-center">Name</th>
              <th className="text-center">E-mail</th>
              <th >age</th>
              <th></th> 
            </tr>
          </thead>
          <tbody>
            {input.map((ele, id) => {
              return (
                <tr key={id} className="text_field">
                  <td className="text-center">{ele.name}</td>
                  <td className="text-center">{ele.email}</td>
                  <td >{ele.age}</td>
                  <td>
                    <button className="btn btn-sm btn-danger mx-2" onClick={() => clickToDelete(ele._id)}>Del</button>
                    <button className="btn btn-sm btn-primary " onClick={()=>clickToEdit(ele._id)}>Edit</button>
                  </td>
                </tr>
              ); 
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Form;
