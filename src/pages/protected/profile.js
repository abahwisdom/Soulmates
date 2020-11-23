import React, { useState, useEffect } from 'react';
import {useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from 'reactstrap'
import firebase from 'firebase'

let $= window.$;

function ProfilePage(props){

    const history= useHistory();

    useEffect(()=>{
       setImage(props.photoUrl)
    },[props.photoUrl]
        
    );

    let anon= 'https://www.rawlinsdavy.com/wp-content/uploads/2018/12/profile-placeholder-300x300.png';

    const [image, setImage]= useState(props.photoUrl);
    const [error, setError]= useState('');

    function imageChange(event){
       if (!event.target.files){return};
       
       setImage(URL.createObjectURL(event.target.files[0]));
        var uploadTask= firebase.storage().ref(`Soulmates/ProfilePictures/${firebase.auth().currentUser.displayName}.jpg`).put(event.target.files[0]);

        uploadTask.on('state_changed', function(snapshot){
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setError('Upload is ' + Math.trunc(progress) + '% done');
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                setError('Upload is paused');
                break;
            //   case firebase.storage.TaskState.RUNNING: // or 'running'
            //     setError('Upload is running');
            //     break;
            }
          }, function(error) {
              setError(error)
            // Handle unsuccessful uploads
          }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              setError('Upload Successful');
              if (props.mode=='create'){
                history.push('/home')
            }
            });
          });
         
   
    };
    
    function regWithoutDp(){
        history.push('/home');
    };

    function deletePicture(){
        firebase.storage().ref(`Soulmates/ProfilePictures/${firebase.auth().currentUser.displayName}.jpg`).delete().then(function() {
            setError('Profile Picture deleted successfully')
          }).catch(function(error) {
            setError('Uh-oh, an error occurred!')
          });;
        setImage(anon);
    }

    

    return(
        <>
            <div className='profile-page' >
                <div className='dp-container-with-text wow zoomIn' data-wow-duration="1.5s"  style={{'display':`${props.mode=='create'?'none': 'flex'}`}}>
                    <div className='dp-container'  style={{'backgroundImage': `url(${image})`}}>
                        {/* <img src='https://us.123rf.com/450wm/marctran/marctran1803/marctran180300563/97608453-passport-photo-portrait-of-asian-smiling-woman-.jpg?ver=6'/> */}
                    </div>
                    <div className='upload'>
                        <Button className='dp-change' color='link' onClick={()=>$('.image').click()}>Change Profile Picture</Button>
                        <input className='image' type='file' accept=".png, .jpg, .jpeg" name='file' onChange={imageChange} style={{'display':'none'}} />
                    </div>
                    <div>{error} </div>
                    {props.mode=='create' && <Button class='dp-change' color='link' onClick={regWithoutDp}>Skip</Button> }
                    {props.mode!=='create' && <Button class='dp-change' color='danger' onClick={deletePicture}>Remove Profile Picture</Button> }
                </div>
                
                <Profile mode={props.mode} userDetails={props.userDetails} />
            </div>
            
        </>
        
    )
}

function Profile(props) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  const history= useHistory();

  useEffect(()=>{
      setMode(props.mode)
  },[]
  )
  const [mode, setMode]= useState('edit')
//   const [key, setKey]= useState(null);

  function onSubmit(data) {
    setStillSubmittingCreate(true);
    // console.log(data);
    let username= data.username;
    const finalData={
        
            data
        }
    
    // console.log(finalData);

    
    async function tempKey(){
        return firebase.database().ref().child('Users').push({[username]:data}).key
    }
    // firebase.database().ref().child('Users').push({[username]:data}).key
    tempKey().then(res=> {
        data.key=res;
        data.likes= '';
        // async function call(){setKey(res)};
        // console.log(data);
        // call().then(()=>data.key=key).then(console.log(data))
    }).then((res)=>firebase.database().ref().child('Users').child(data.key).set({[username]:data}))
    .then((res) => {
        return firebase.auth().currentUser.updateProfile({
          displayName: data.key
        })
    }).then(res=>{
            // props.forCreate()
            $('.dp-container-with-text').show();
            $('.profile-form').hide()
            setStillSubmittingCreate(false)
        
        // history.push('/home')
    })
    

  }

  const [stillSubmittingCreate, setStillSubmittingCreate]=useState(false);

  function onEdit(data){
    setStillSubmittingCreate(true);
    async function renewKey(){
        data.key= firebase.auth().currentUser.displayName;
        data.likes= props.userDetails.likes;
    };
    renewKey().then((res)=>firebase.database().ref().child('Users').child(firebase.auth().currentUser.displayName).set({[data.username]:data})).then(res=>{
      history.push('/home');
      setStillSubmittingCreate(false);
    })
  }

  return (
    <div className='sign-body profile-form wow zoomIn' data-wow-duration="1.5s"  >
      {/* <Link to='/'className='sign-logo'>
        S<img className='logoSign' src={logoThree}/>ulmate(s)
      </Link> */}
      

      <form onSubmit= {mode=='create'?handleSubmit(onSubmit):handleSubmit(onEdit)} className='sign-contain'>
        <input className='sign-input username-edit'
          name="username"
          maxLength= '10'
          minLength= '3'
          required
          defaultValue={props.userDetails!==undefined?props.userDetails.username:''}
        //   pattern= '/^[A-Za-z]+$/i'
          required
          ref={register({
            required: true,
            // minLength: 3,
            // maxLength: 20,
            // pattern: /^[A-Za-z]+$/i,
          })}
          
          placeholder="Username"
        />

        <input className='sign-input age-edit'
            type='number'
            name="age"
            max= '250'
            min= '18'
            required
            defaultValue={props.userDetails!==undefined?props.userDetails.age:''}
            //   pattern= '/^[A-Za-z]+$/i'
            // required
            ref={register({
                required: true,
                // min: 6,
                // maxLength: 20,
                // pattern: /^[A-Za-z]+$/i,
            })}
            
            placeholder="Age"
        />

            <select 
            name="gender" 
            className='sign-input gender-edit'
            // options={["female", "male", "other"]} 
            defaultValue={props.userDetails!==undefined?props.userDetails.gender:'Other'}
            // defaultValue= 
            required
            ref={register({
                // required: true,
                // min: 6,
                // maxLength: 20,
                // pattern: /^[A-Za-z]+$/i,
            })}
            placeholder="Gender"
            >
            <option name='gender' value='Male'>Male</option>
           <option name='gender' value='Female'>Female</option>          
           <option name='gender' value='Other'>Other</option>

            </select>

        <input className='sign-input city-edit'
            name="city"
            defaultValue={props.userDetails!==undefined?props.userDetails.city:''}
            //   pattern= '/^[A-Za-z]+$/i'
            ref={register({
                // required: true,
                // min: 6,
                // maxLength: 20,
                // pattern: /^[A-Za-z]+$/i,
            })}
            
            placeholder="City of Residence"
        />
        
         
        {/* <label for='about'>About</label> */}
        <textarea className='sign-input about about-edit'
            name='about'
            maxLength='300'
            defaultValue={props.userDetails!==undefined?props.userDetails.about:''}
            //   pattern= '/^[A-Za-z]+$/i'
            // required
            ref={register({
                // required: true,
                // min: 6,
                // maxLength: 20,
                // pattern: /^[A-Za-z]+$/i,
            })}
            
            placeholder="About Yourself"
        />
        <button className='sign-submit'
        type="submit" 
        disabled={formState.isSubmitting||stillSubmittingCreate}>
          {mode=='create'?'Create Profile':'Update'}
        </button>
      </form>

    </div>
  );
}

  export default ProfilePage