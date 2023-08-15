import { useEffect, useState } from "react"
import axios from "../api/axios";

const Users = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
      let isMounted = true;
      const controller = new AbortController();

    
      const getUsers = async () => {
        try {
            const response = await axios.get('/api/v1/user', {
                signal: controller.signal
            });
            console.log(response.data);
            isMounted && setUsers(response.data);
        } catch (err) {
            console.log(err);
        }
      }

      getUsers();
      return () => {
        isMounted = false;
        controller.abort();
      }
    }, [])
    

    return (
        <article>
            <h2> Users List</h2>
            
        </article>
    )
}