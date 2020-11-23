import React from 'react';
import {Link } from "react-router-dom";



const Dashboard=()=>{

    return(
        <>

            <div className="page">

            <div className="archive">

                <Link to='home/explore'>
                    <article className="article wow zoomIn" data-wow-duration="1.5s">
                        Explore
                        <div className="image single" style={{'backgroundImage': 'url(/explore.jpg)'}}></div>
                    </article>
                </Link>

                <Link to='home/likes'>
                    <article className="article wow zoomIn" data-wow-duration="1.5s">
                        New Likes
                        <div className="image single" style={{'backgroundImage': 'url(https://images.unsplash.com/photo-1556800468-84fcf08acdfc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80)'}}></div>
                    </article>
                </Link>

                <Link to='home/chat'>
                    <article className="article wow zoomIn" data-wow-duration="1.5s">
                        Chats
                        <div className="image single" style={{'backgroundImage': 'url(https://images.unsplash.com/photo-1568112722371-6640a76ad9ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80)'}}></div>
               
                    </article>
                </Link>

                <Link to='home/edit-profile'>
                    <article className="article wow zoomIn" data-wow-duration="1.5s">
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