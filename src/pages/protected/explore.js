import React, { useState } from 'react';
import {useEffect} from 'react'
import firebase from 'firebase'
import ExploreUnit from '../../components/explore-unit';

const ExploreSingle=(props)=>{

    const [entireData, setEntireData]= useState(null);
    const [currentGender, setCurrentGender]= useState('ALL');

    useEffect(()=>{
        firebase.database().ref().child('Users').on("value", function(snapshot) {
            // console.log(snapshot.val());
            // console.log(Object.entries(snapshot.val()));
            // console.log(Object.entries(snapshot.val())[0]);
            // console.log(Object.entries(snapshot.val())[0][1]);
            // console.log(Object.entries(Object.entries(snapshot.val())[0][1]));
            // console.log(Object.entries(Object.entries(snapshot.val())[0][1])[0])
            // console.log(Object.entries(Object.entries(snapshot.val())[0][1])[0][1])
            // console.log(Object.entries(Object.entries(snapshot.val())[0][1])[0][1].gender)
            
            // const [nowArray]= Object.keys(snapshot.val());
            // console.log(nowArray);
            // const {[nowArray]: infoObj }= snapshot.val();
            // console.log(infoObj);
            // setInfo(infoObj);

            setEntireData(Object.entries(snapshot.val()));

        })},[]
    )

   

    return(
        <>
        {/* <div className='gender-select'>Sort</div> */}
        <select className='gender-select' name='currentGender' onChange={(e)=>setCurrentGender(e.target.value)}>
            <option name='currentGender' value='ALL'>All</option>
            <option name='currentGender' value='Female'>Female</option>
            <option name='currentGender' value='Male'>Male</option>
            <option name='currentGender' value='Other'>Other</option>
        </select>
        <div className='archive'>
        { entireData?
            entireData.map(user=>{
                // user[1]
               var details= Object.entries(user[1])[0][1];
              
                if (details.key!==props.userDetails.key){
                    return(
                        <React.Fragment key={details.key}>
                             <ExploreUnit
                                 username={details.username} 
                                 age={details.age} 
                                 gender={details.gender} 
                                 city={details.city} 
                                 about={details.about} 
                                 url={details.key}
                                 userDetails={props.userDetails}
                                 currentGender={currentGender}
                             />
                         </React.Fragment>
         
                    ) 
                   
                }
              
    
            }) : ''
            // .map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort).map((a) => a.value)
        }
        </div>
        
            
        </>
    )
}



export default ExploreSingle