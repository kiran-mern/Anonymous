import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Cards from '../common/Cards'

type Group={
  id:number,
  name:string,
  imageUrl:string
}

const AvailableGroup = () => {
  const token= localStorage.getItem('user')

  const [groups,setGroups]=useState<Group[]>([]);

  useEffect(()=>{
    const fetchData=async()=>{
      try{
        const response = await axios.get('http://localhost:3000/user/allGroups',{
          headers:{
            authorization:`${token}`
          }
        })
        const groupData= response.data.data.map((group:any)=>({
          id:group.group_id,
          name:group.groupName,
          imageUrl:group.imageUrl || ''
        }))
        setGroups(groupData);

      }catch(err){
        console.log(err,'error while fetching groups');
      }

    }
    fetchData()
  },[token])

  const joinGroup=async(groupId:number)=>{
    try{
      const response=await axios.post('http://localhost:3000/user/joinGroup',{groupId},
      {
        headers:{
          authorization:`${token}`
        }
      }
    )
    console.log(response,'joined Group ');
    }
    catch(err){
      console.log(err,'eror while joining group');
    }

  }
  return (
    <Cards items={groups} onAction={joinGroup} renderButton={(id)=>(
      <button 
      onClick={()=>joinGroup(id)} 
      className= "bg-teal-500 text-white px-4 py-1 rounded-full hover:bg-teal-600 transition-colors">
         Join
      </button>

    )}/>
  )
}

export default AvailableGroup