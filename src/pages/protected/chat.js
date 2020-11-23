import React from 'react'
import Talk from "talkjs";

class Chat extends React.Component {
    constructor(props) {
      super(props)
      this.talkjsContainer = React.createRef();
    //   this.state={
    //       messageMode: false 
    //   }
    }

  
    componentDidMount() {    
      Talk.ready.then(() => {
        var me = new Talk.User({
          id: 
          this.props.userDetails.key,
        //   65098,
          name: this.props.userDetails.username,
        //   email: "demo@talkjs.com",
          photoUrl: this.props.photoUrl,
          welcomeMessage: "Hey there! How are you? :-)",
          role: "user"
        });
        
        window.talkSession = new Talk.Session({
          appId: process.env.REACT_APP_TALKJS_API_KEY,
          me: me
        });
        
        
        if (this.props.recipient){
            var other = new Talk.User({
            id: this.props.recipient.id,
            // 65099,
            name: this.props.recipient.username,
            // "Sebastian",
            // email: "demo@talkjs.com",
            // photoUrl: this.props.recipient.photoUrl,
            // "https://demo.talkjs.com/img/sebastian.jpg",
            welcomeMessage:  "Hey, how can I help?",
            role: "user"
            });

            var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
            conversation.setParticipant(me);
            conversation.setParticipant(other);
            var inbox = window.talkSession.createInbox({selected: conversation});
            inbox.mount(this.talkjsContainer.current);
        } else{
            var inbox = window.talkSession.createInbox();
            inbox.mount(this.talkjsContainer.current);
        }
         

        

           

        // // if (this.props.location.state!==undefined){
        //     // console.log(this.props.location.state.username)
        //     // var inbox = window.talkSession.createInbox({selected: conversation});
        // // }else{
        //     var inbox = window.talkSession.createInbox();
        // // }
       
        
        
        
        // inbox.mount(this.talkjsContainer.current);
      });
    }


    componentDidUpdate() {    
        Talk.ready.then(() => {
          var me = new Talk.User({
            id: 
            this.props.userDetails.key,
            // 65098,
            name: this.props.userDetails.username,
          //   email: "demo@talkjs.com",
            photoUrl: this.props.photoUrl,
            welcomeMessage: "Hey there! How are you? :-)",
            role: "user"
          });
          
          window.talkSession = new Talk.Session({
            appId: "tfmRxJEl",
            me: me
          });
          
          
          if (this.props.recipient){
              var other = new Talk.User({
              id: this.props.recipient.id,
              // 65099,
              name: this.props.recipient.username,
              // "Sebastian",
              // email: "demo@talkjs.com",
              photoUrl: this.props.recipient.photoUrl,
              // "https://demo.talkjs.com/img/sebastian.jpg",
              welcomeMessage:  "Hey, how can I help?",
              role: "user"
              });
  
              var conversation = window.talkSession.getOrCreateConversation(Talk.oneOnOneId(me, other));
              conversation.setParticipant(me);
              conversation.setParticipant(other);
              var inbox = window.talkSession.createInbox({selected: conversation});
              inbox.mount(this.talkjsContainer.current);
          } else{
              var inbox = window.talkSession.createInbox();
              inbox.mount(this.talkjsContainer.current);
          }
        })}
  
    render() {
        // console.log(this.props.value)
        
      return (
        <div ref={this.talkjsContainer} className="chatbox-container wow zoomIn" data-wow-duration="1.5s" ></div>
      )
    }
  }

  
export default Chat