import React from 'react';
import {useContext, useEffect, useState} from 'react'
import logoThree from '../components/resource/logoThree.svg'
import {Link} from 'react-router-dom'
import UserContext from '../components/context/UserContext';
import firebase from 'firebase'

const Landing=()=>{
    const user= useContext(UserContext);
    
    const [userDetails, setInfo]= useState({username:'...'});

    useEffect(()=>{
        if (user===null){return};
        firebase.database().ref().child('Users').child(firebase.auth().currentUser.displayName).on("value", function(snapshot) {
            // console.log(snapshot.val());
            
            const [nowArray]= Object.keys(snapshot.val());
            // console.log(nowArray);
            const {[nowArray]: infoObj }= snapshot.val();
            // console.log(infoObj);
            setInfo(infoObj);

          })
    },[user])

    function logOut(e){
        e.preventDefault();
        const auth= firebase.auth();
        auth.signOut()
        .then(()=>window.location.href='/')
        .then(console.log('out'))
    };

    const [iconsDisplay, setIconsDisplay]= useState('block');

    useEffect(()=>{
        window.innerWidth>1007?setIconsDisplay('block'):setIconsDisplay('none')
    },[])

    return(
        <>
        
    <header id="home">
        {/* <div className="overlay"></div> */}
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="javascript:void(0)">
                    <h3 className="my-heading ">{user!==null?`Logged in as ${userDetails.username}`:'You just struck Gold'}</h3>
                </a>
                {/* <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="fa fa-bars mfa-white"></span>
                </button> */}
                <div  >
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                           
                                {user!==null?<a className="nav-link" 
                                onClick={(e)=>logOut(e)}
                                >Sign Out</a>:<Link to='/signup' className="nav-link">Register</Link>
                                }
                            
                        </li>

                    </ul>

                </div>

            </div>
        </nav>

        <div className="tophead" >
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-7 ">
                        <h1 className="title-main wow bounceIn" data-wow-duration="2s">Soulmate(s)</h1>
                        <h3 className="subtitle-main wow fadeInUp" data-wow-duration="1.1s">So kiss me sweet...,<br/>
{/* Still fragrant with ruby wine,<br/> */}
And say with a fervor born of the South<br/>
That your body and soul are mine.<br/>
Clasp me close in your warm young arms,<br/>
While the pale stars shine above,<br/>
And we’ll live our whole young lives away<br/>
In the joys of a living love.</h3>
						<div className="top-btn-block wow fadeInUp" data-wow-duration="2.5s">
							<Link to={user!=null?'/home':'/signin'}  className="btn-explore ">Explore</Link>
							<Link to='/signup' className="btn-account ">Create Account</Link>
						</div>
                    </div>
                    <div className='logo-div wow bounceIn ' data-wow-duration="2s" ><img className='logo' src={logoThree}/></div>
                </div>
            </div>

        </div>
        {/* <div className="sesgoabajo"></div> */}
    </header>


        </>
    )
}

export default Landing