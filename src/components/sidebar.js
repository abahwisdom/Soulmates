import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'reactstrap';
import firebase from 'firebase';
import {useHistory, Link} from 'react-router-dom'



const Sidebar = (props) => {

    const history= useHistory();

    function logOut(){
        const auth= firebase.auth();
        auth.signOut()
        .then(()=>window.location.href='/')
        // .then(console.log('out'))
    };

    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // alert("You clicked outside of me!");
                    removeNav();
                }
            }
    
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }

    const [slide, setSlide]= useState(null);
    const [overlay, setOverlay]= useState('none');

    function miniNav(){
        setSlide('slide');
        setOverlay('block');
    }

    function removeNav(){
        setSlide(null);
        setOverlay('none');
    }

    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    // debugger;

    

    return (
        <>
        <div className='side-with-toggle' >
    <div className="btn-toggle"
    onClick={miniNav}
    
    ><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg></div>
    <div className= {`contain-side ${slide}`}  ref={wrapperRef}>
        <div className='sidebar'>
          <div className='side-profile'>
              <div className='side-profile-pic' style={{'backgroundImage':`url(${props.photoUrl})`}}></div>
              <div className='side-profile-name'>{props.userDetails.username} </div>
              {/* <hr className='hr-text'/> */}
          </div>
          <div className='side-menu'>
              {/* <NavLink tag={Link} className='side-menu-item' to='/home/likes'>Jane</NavLink> */}
              <NavLink tag={Link} className='side-menu-item' to='/home' onClick={removeNav} >
              <i className="fas fa-columns"></i>
                  Dashboard</NavLink>
              <NavLink tag={Link} className='side-menu-item' to='/home/explore' onClick={removeNav} >
              <i className="fas fa-gem"></i>
                  Explore</NavLink>
              <NavLink tag={Link} className='side-menu-item' to='/home/likes' onClick={removeNav} >
              <i className="fas fa-heart"></i>
                  Likes</NavLink>
              <NavLink tag={Link} className='side-menu-item' to='/home/edit-profile' onClick={removeNav} >
              <i className="fas fa-user-edit"></i>
                  Edit Profile</NavLink>
              <NavLink tag={Link} className='side-menu-item' to='/home/chat' onClick={removeNav} >
              <i className="fas fa-comments"></i>
                  Chats</NavLink>
              <NavLink className='side-menu-item' 
              onClick={()=>logOut()}
              >
                  <i className="fas fa-sign-out-alt"></i>
                  Log Out</NavLink>
            
          </div>
        </div>
    </div>
      
    <div className="overlay-side" style={{'display':`${overlay}`}}>
        <div id="loading-img"></div>
    </div>
    </div>
    

      </>
    );
}

export default Sidebar