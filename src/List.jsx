import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { useEffect } from 'react';
import 'font-awesome/css/font-awesome.min.css';

const colors=['#FF78EF','#FF6B7C','#FF8952','#FFD53D','#C7FF5E','#1FFFBC','#A1CAFF','#B77DFF']
const List=()=>{
    const[list,setList]=useState(JSON.parse(localStorage.getItem('todos')) || [])
    // const[list,setList]=useState([])
    const[tit,setTit]=useState('');
    const[des,setDes]=useState('');
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(list));
    },[list])


    const randomColor=()=>{

    }

    const addListItems=(tit,des)=>{
        setList([...list,{id:uuidv4(),status:0,title:tit,desc:des}]);
        setTit('')
        setDes('')
    }

    const changeStatus=(obj,completed)=>{
            const newList=list.map((obj2)=>{
                return obj2.id==obj.id?{...obj2,status:!obj.status}:obj2;
            })
         setList(newList)
         console.log(list);
         console.log(completed);
    }

    const removeItems=(obj)=>{
        const newList=list.filter((obj2)=>{
           return obj2.id!=obj.id;
         })
      setList(newList)
     }


    return(
        <>
        <div>
        <h1> To-Do List </h1>
 <div>
    <h2>Add ToDo</h2>
    <input value={tit} placeholder='Enter the Title' onChange={(e)=>setTit(e.target.value)}/><br/>
    <input value={des} placeholder='Enter the Desc' onChange={(e)=>setDes(e.target.value)}/><br/>
    {(tit.trim()!='') && <button onClick={()=>addListItems(tit,des)}>add</button>}
 </div><br/>
    
    <h1>Remaining Tasks</h1>
        <ol>{list.map((obj)=>obj.status==0 && <li style={{border:"5px solid", borderColor:colors[Math.floor(Math.random() * colors.length)], margin:"5px"}} key={obj.id}>
                       <ul>Title: {obj.title}</ul>
                       <ul>Desccription: {obj.desc}</ul> 
                       <ul>Status: {obj.status==0?"not completed":"completed"}</ul> <br/>
                        {obj.status==0 && <div><p>Mark as Completed</p> <input type='checkbox' onChange={(e)=>changeStatus(obj,e.target.value)}/></div>} <br/>
                        <i className="fa fa-trash" style={{ color: 'red' }}  onClick={()=>removeItems(obj)}></i>
                       </li> )} </ol> </div>

                       <div><h1>Completed Tasks</h1>
                       <ol>{list.map((obj)=>obj.status==1 && <li style={{border:"5px solid", borderColor:colors[Math.floor(Math.random() * colors.length)], margin:"5px"}} key={obj.id}>
                       <ul>Title: {obj.title}</ul>
                       <ul>Desccription: {obj.desc}</ul>
                       <ul>Status: {obj.status==0?"not completed":"completed"}</ul> <br/>
                        {obj.status==1 && <div><p>Mark as Completed</p> <input checked={obj.status==1} type='checkbox' onChange={()=>changeStatus(obj)}/></div>} <br/>
                        <i className="fa fa-trash "  style={{ color: 'red' }}onClick={()=>removeItems(obj)}></i>
                       </li> )}</ol>
                       </div>
        </>
    )
}

export default List;