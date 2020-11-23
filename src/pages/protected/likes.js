import React, { useState} from 'react';
import {useEffect} from 'react'
import firebase from 'firebase'
import { Alert } from 'reactstrap'
import ExploreUnit from '../../components/explore-unit';

const Likes=(props)=>{

    const temp= <Alert color='danger' className='temp-like' >No Likes Yet</Alert>
    const [entireData, setEntireData]= useState(temp);

    useEffect(()=>{
        if (!props.userDetails.username){
            console.log('Not yet')
        }else{
            firebase.database().ref().child('Users')
            .child(props.userDetails.key)
            .child(props.userDetails.username).child('likes')
            .on("value", function(snapshot) {
                var likes= snapshot.val();
                console.log(likes);
                console.log('yes');
                if (likes!=='' && likes!==null && likes!==undefined){
                firebase.database().ref().child('Users').on("value", function(snapshot) {
                const A= Object.entries(snapshot.val());
                var C=[];
                const B= A.map(user=>{
                        likes.map(userLike=>{
                            if (user[0]==userLike){
                                console.log(userLike);
                                var details= Object.entries(user[1])[0][1];
                                // C= details;
                                console.log(details);
                                C.push(
                                                    <React.Fragment key={details.key}>
                                                        <ExploreUnit
                                                            username={details.username} 
                                                            age={details.age} 
                                                            gender={details.gender} 
                                                            city={details.city} 
                                                            about={details.about} 
                                                            url={details.key}
                                                            userDetails={props.userDetails}
                                                            mode='like'
                                                            setRecipient={props.setRecipient}
                                                            currentGender='ALL'
                                                        />
                                                    </React.Fragment>
                                    
                                                ) 
                            } else{return null}
                        }
                        )
                    }
            
                    );
                    // console.log(A);
                    setEntireData(C.map(unit=>{return unit}));

                
                })}

                })
        
                
                }
        
        
       
    },[props.userDetails]
    )
   

    return(
        <>
        {entireData}           
        </>
    )
}


export default Likes