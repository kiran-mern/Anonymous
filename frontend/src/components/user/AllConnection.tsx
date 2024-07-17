import React, { useEffect, useState } from 'react'
import Cards from '../common/Cards'
import axios from 'axios'


type Connection = {
    id: string,
    name: string

}
const AllConnection = () => {
    const token = localStorage.getItem('user')
    const [connection, setConnection] = useState<Connection[]>([])
    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get('http://localhost:3000/user/newConnections', {
                    headers: {
                        authorization: `${token}`
                    }
                });
                console.log(response, 'response in allconection');

                const data = response.data.findConnect.map((connection: any) => ({
                    id: connection.user_id,
                    name: connection.name
                }));
                setConnection(data)
            } catch (err) {
                console.log(err, 'error while view connections');
            }
        }
        fetchData()
    }, [token])

    const handleConnect=async(receiverId:number)=>{
        try{ const response= await axios.post('http://localhost:3000/user/connect',{receiverId},{
            headers:{
                authorization:`${token}`
            }
        })
        console.log(response,'connction request');
        

        }
        catch(err){
            console.log(err,'error while giving request');
            
        }
       

    }

    return (
        <Cards items={connection} onAction={handleConnect} renderButton={(id)=>(
            <button onClick={()=>handleConnect(id)}
            className="bg-teal-500 text-white px-4 py-1 rounded-full hover:bg-teal-600 transition-colors">
                Connect
            </button>
        )} /> 


   )
}

export default AllConnection