import React from 'react';
;
const UserDetails = async({params}: {params : Promise<{id : string}>}) => {
    console.log(params,'params')
  const {id} = await params
    return (
      
            <div>heyy {id}</div>

        
       
    )
}
export default UserDetails;