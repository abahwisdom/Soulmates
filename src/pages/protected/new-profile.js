import React from 'react';
import {useContext, useEffect, useState} from 'react'
import logoThree from '../../components/resource/logoThree.svg'
import UserContext from '../../components/context/UserContext';
import loading from '../../components/resource/loading.svg'
import ProfilePage from './profile';

const NewProfile=()=>{
    let user= useContext(UserContext);

    let anon= 'https://www.rawlinsdavy.com/wp-content/uploads/2018/12/profile-placeholder-300x300.png';
    const [photo, setPhoto]= useState(anon);

    useEffect(()=>{
        console.log(user)
    },[]
        
    );

    if (user==null){return <div className='loading-div' ><img className='loading-icon' src={loading}></img></div>}
    else if (user.displayName!==null){
        window.location.href='/'
        return <div className='loading-div' ><img className='loading-icon' src={loading}></img></div>
    };
    // if (user==null){return 'a'};
    return(
        <>

        

        
              <div to='/'className='sign-logo sign-logo-home new-sign-logo wow bounceIn'data-wow-duration="1.5s">
                S<img className='logoSign logoSign-home new-logoSign' src={logoThree}/>ulmate(s)
              </div>
              <div className=' edit-heading new-edit-heading wow fadeIn' data-wow-duration="1.5s">Create Profile</div>
                <ProfilePage mode='create' photoUrl={photo} />


        </>
    )
}

export default NewProfile