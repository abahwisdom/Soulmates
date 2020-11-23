import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import logoThree from '../../components/resource/logoThree.svg';
import ProfilePage from './profile';
import {useState, useContext, useEffect} from 'react'
import UserContext from '../../components/context/UserContext';
import loading from '../../components/resource/loading.svg'
import '../../styles/home.css'
import Dashboard from './dashboard';
import firebase from 'firebase'
import ExploreSingle from './explore';
import Likes from './likes';
import Chat from './chat';
import Footer from '../../components/footer';
import Sidebar from '../../components/sidebar';


function Home(){

    const[recipient, setRecipient]= useState(null);

    let anon= 'https://www.rawlinsdavy.com/wp-content/uploads/2018/12/profile-placeholder-300x300.png';


    let user= useContext(UserContext);
    const [userDetails, setInfo]= useState({});
    const [photo, setPhoto]= useState(anon);

    useEffect(()=>{
        if (user==null){return};
        firebase.database().ref().child('Users').child(firebase.auth().currentUser.displayName).on("value", function(snapshot) {
            // console.log(snapshot.val());
            
            const [nowArray]= Object.keys(snapshot.val());
            // console.log(nowArray);
            const {[nowArray]: infoObj }= snapshot.val();
            // console.log(infoObj);
            setInfo(infoObj);

        });

        var dp= firebase.storage().ref(`Soulmates/ProfilePictures/${firebase.auth().currentUser.displayName}.jpg`);
        dp.getDownloadURL()
        .then(function(url) {
            // console.log(url);
        setPhoto(url);
        })
        .catch(function(error) {
        // console.log("error encountered");
        })

    },[user]
        
    );

    

    if (user==null){return <div className='loading-div' ><img className='loading-icon' src={loading}></img></div>};
    // if (user==null){return 'a'};
    return(
        <Router>
        <>
        
             <div className='App' >
          <Sidebar userDetails={userDetails} photoUrl={photo}/>

          <div className="contain-contents">
              <div to='/'className='sign-logo sign-logo-home wow bounceIn'data-wow-duration="1.5s">
                S<img className='logoSign logoSign-home' src={logoThree}/>ulmate(s)
              </div>
              <div className=' edit-heading'></div>
              <Switch>
                <Route exact path='/home'>
                    <div className=' edit-heading'></div>
                    <Dashboard userDetails={userDetails} photoUrl={photo} />
                </Route>
                <Route path='/home/edit-profile'>
                    <div className=' edit-heading wow bounceIn'data-wow-duration="1.5s">Edit Profile</div>
                    <ProfilePage userDetails={userDetails} photoUrl={photo} mode='edit'/>
                </Route>
                <Route path='/home/explore'>
                    <div className=' edit-heading wow bounceIn'data-wow-duration="1.5s">Explore Profiles</div>
                    <ExploreSingle userDetails={userDetails} photoUrl={photo} mode='edit'/>
                </Route>
                <Route path='/home/likes'>
                    <div className=' edit-heading wow bounceIn'data-wow-duration="1.5s">Liked Your Profile</div>
                    <Likes userDetails={userDetails} photoUrl={photo} setRecipient={setRecipient}  mode='edit'/>
                </Route>
                <Route path='/home/chat'>
                    <div className=' edit-heading wow bounceIn'data-wow-duration="1.5s">Chat</div>
                    <Chat userDetails={userDetails} photoUrl={photo} recipient={recipient}/>
                </Route>
            </Switch>

            <Footer/>
                
            </div>
          
        </div>
        
        

       


        </>
        </Router>
    )
}

export default Home