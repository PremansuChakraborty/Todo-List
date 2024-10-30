import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { useEffect } from 'react';
const List=()=>{
    const[list,setList]=useState(JSON.parse(localStorage.getItem('todos')) || [])
    const[tit,setTit]=useState('');
    const[des,setDes]=useState('');
    useEffect(()=>{
        localStorage.setItem('todos',JSON.stringify(list));
    },[list])
    return(
        <>
        <div>
        <h1> To-Do List developed by Tultuli</h1>
 <div>
    <h2>Add ToDo</h2>
    <input value={tit} placeholder='Enter the Title' onChange={(e)=>setTit(e.target.value)}/><br/>
    <input value={des} placeholder='Enter the Desc' onChange={(e)=>setDes(e.target.value)}/><br/>
    {(tit.trim()!='' && des.trim()!='') && <button onClick={()=>{
        setList([...list,{id:uuidv4(),status:0,title:tit,desc:des}]);
        setTit('')
        setDes('')
    }}>add</button>}
        <h1>Remaining Tasks</h1>
 </div><br/><br/>
        {list.map((obj)=>obj.status==0 && <div key={obj.id}>
                       <p>{obj.title}</p> <br/>
                       <p>{obj.desc}</p> <br/>
                       <p>{obj.status==0?"not completed":"completed"}</p> <br/>
                        {obj.status==0 && <button onClick={()=>{
                            const newList=list.map((obj2)=>{
                                return obj2.id==obj.id?{...obj2,status:1}:obj2;
                            })
                         setList(newList)
                        }}>Mark As Completed</button>}
                        <button onClick={()=>{
                           const newList=list.filter((obj2)=>{
                              return obj2.id!=obj.id;
                            })
                         setList(newList)
                        }}>Remove</button>
                       </div> )}  </div>

                       <div><h1>Completed Tasks</h1>
                       {list.map((obj)=>obj.status==1 && <div key={obj.id}>
                       <p>{obj.title}</p> <br/>
                       <p>{obj.desc}</p> <br/>
                       <p>{obj.status==0?"not completed":"completed"}</p> <br/>
                        {obj.status==0 && <button onClick={()=>{
                            const newList=list.map((obj2)=>{
                                return obj2.id==obj.id?{...obj2,status:1}:obj2;
                            })
                         setList(newList)
                        }}>Mark As Completed</button>}
                        <button onClick={()=>{
                           const newList=list.filter((obj2)=>{
                              return obj2.id!=obj.id;
                            })
                         setList(newList)
                        }}>Remove</button>
                       </div> )}
                       </div>
        </>
    )
}

export default List;