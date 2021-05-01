import React, { useState } from 'react';
import {useEffect} from 'react'
import { useHistory} from 'react-router-dom'
import firebase from 'firebase'
import { Button} from 'reactstrap'



const ExploreUnit=(props)=>{

    const[confirmLike, setConfirmLike ]= useState('Like');

    let history= useHistory();

    let anon= 'https://www.rawlinsdavy.com/wp-content/uploads/2018/12/profile-placeholder-300x300.png';
    const [singlePhoto, setPhoto]= useState(anon);
    // const [data, setData]= useState(null);
    useEffect(()=>{

        let oldLike;
        firebase.database().ref().child('Users').child(props.url).child(props.username).child('likes')
        
        .on("value", function(snapshot) {
            oldLike= snapshot.val();
            // console.log(oldLike);
            if (oldLike.includes(props.userDetails.key)){
                // console.log('false');
                setConfirmLike('Already liked!')
            }
            

        });

        var dp= firebase.storage().ref(`Soulmates/ProfilePictures/${props.url}.jpg`);
        dp.getDownloadURL()
        .then(function(url) {
            // console.log(url);
        setPhoto(url);
        })
        .catch(function(error) {
        // console.log("error encountered");
        });
    },[])

    function like(e){
        // e.stopPropagation();
        // e.preventDefault();
        let oldLike;
        firebase.database().ref().child('Users').child(props.url).child(props.username).child('likes')
        
        .on("value", function(snapshot) {
            oldLike= snapshot.val();
            console.log(oldLike);
            

        });

        if(oldLike===null){
            let newLike= [props.userDetails.key];
            // [...oldLike, 'c', 'd']

            console.log(newLike);
            firebase.database().ref().child('Users').child(props.url).child(props.username).child('likes').set(newLike).then(
                setConfirmLike('Liked!!')
            )

        }else if (oldLike.includes(props.userDetails.key)){
            console.log('false')}
        else{
            let newLike= [...oldLike, props.userDetails.key];
            // [...oldLike, 'c', 'd']

            console.log(newLike);
            firebase.database().ref().child('Users').child(props.url).child(props.username).child('likes').set(newLike).then(
                setConfirmLike('Liked!!')
            )
            }
            
        

    

    }

    function messageClick(){
        props.setRecipient({
            username: props.username,
            photoUrl: singlePhoto,
            id: props.url,
        });
        history.push('/home/chat')
    }

    return(
        <>
        
        <div className="page wow zoomIn" data-wow-duration="1.5s" 
        style={{'display':`${props.currentGender==props.gender||props.currentGender=='ALL'?'block':'none'}`}}
        >
          {/* <div className="archive"> */}
            <article className="article">
                <div className="contain-explore">
                    <div className="pic">
                        <div className="pic-counter-wrapper">
                            <span className="dot" id="active"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                       <div className='image explore-image' style={{'backgroundImage':`url(${singlePhoto})`}}>
                           
                       </div>
                    </div>
                    <div className="name-box">
                        <div className='explore-name'>{props.username}, <span className="explore-age"> {props.age} </span></div>
                        <div className='explore-city'>{props.gender}, {props.city}</div>
                    </div>
                    <div className="info">
                        <p className='explore-about'>
                            {props.about}
                        </p> 
                    </div>
                    
                </div>
                <div className='button-div'>
                     <Button className='explore-like' color='primary'onClick={like}>
                     <i className="fas fa-heart"></i>
                         {confirmLike} </Button>
                {props.mode=='like' && 
                    <Button  color='danger' className='explore-message' onClick={messageClick}>
                        <i className="fas fa-comments"></i>
                        Message</Button>
                }
                </div>
               
                
                   

            </article>
                
               
          
            {/* </div> */}
    </div>

        </>
    )
}

export default ExploreUnit