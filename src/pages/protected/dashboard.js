import React from 'react';
import {Link } from "react-router-dom";



const Dashboard=()=>{

    return(
        <>

            <div className="page">

            <div className="archive">

                <Link to='home/explore' className='text-decoration-none'>
                    <article className="article wow zoomIn" data-wow-duration="1.5s" style={{height:'auto'}}>
                        Explore
                        <div className="image single" style={{'backgroundImage': 'url(/explore.jpg)'}}></div>
                    </article>
                </Link>

                <Link to='home/likes' className='text-decoration-none'>
                    <article className="article wow zoomIn" data-wow-duration="1.5s" style={{height:'auto'}}>
                        New Likes
                        <div className="image single" style={{'backgroundImage': 'url(https://images.unsplash.com/photo-1556800468-84fcf08acdfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)'}}></div>
                    </article>
                </Link>

                <Link to='home/chat' className='text-decoration-none'>
                    <article className="article wow zoomIn" data-wow-duration="1.5s" style={{height:'auto'}}>
                        Chats
                        <div className="image single" style={{'backgroundImage': 'url(https://images.unsplash.com/photo-1568112722371-6640a76ad9ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)'}}></div>
               
                    </article>
                </Link>

                <Link to='home/edit-profile' className='text-decoration-none'>
                    <article className="article wow zoomIn" data-wow-duration="1.5s" style={{height:'auto'}}>
                        Edit Profile
                        <div className="image single" style={{'backgroundImage': 'url(https://images.ctfassets.net/u4vv676b8z52/1RuZx9zOIlAHhSdG1G7dX3/5cbc955394ae49cd17f76946160ffc37/Eyeglass-Frame-Size-678x446.jpg?fm=jpg&q=80)'}}></div>
                 
                    </article>
                </Link>
            </div>
            </div>

        </>
    )
}

export default Dashboard