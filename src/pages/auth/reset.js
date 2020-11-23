import React from 'react';
import {useState} from 'react';
import { Link } from "react-router-dom";
import logoThree from '../../components/resource/logoThree.svg'
import { useForm } from "react-hook-form";
// import isEmail from "validator/lib/isEmail";
import { Button } from 'reactstrap'
import firebase from 'firebase';




function Reset() {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  const [error, setError]= useState(null);

  

  function onSubmit(data) {
    console.log(data);
    firebase.auth().sendPasswordResetEmail(data.email)
    // .then(props.setUser(firebase.auth().currentUser))
    // .then(()=>window.location.href='/home')
    .then(setError('Sent! Check Email for Reset Link'))
    .catch(e=> {console.log(e.message); setError(e.message)})
  }
  

  return (
    <div className='sign-body wow wobble' data-wow-duration="1.5s">
     <Link to='/'className='sign-logo'>
        S<img className='logoSign' src={logoThree}/>ulmate(s)
     </Link>

      <form onSubmit={handleSubmit(onSubmit)} className='sign-contain'>
        {/* <input className='sign-input'
          name="username"
          maxLength= '20'
          minLength= '6'
          pattern= '/^[A-Za-z]+$/i'
          required
          ref={register({
            required: true,
            minLength: 6,
            maxLength: 20,
            pattern: /^[A-Za-z]+$/i,
          })}
          
          placeholder="Enter your username"
        /> */}
        <input className='sign-input'
          type='email'
          name="email"
          required
          ref={register({
            required: true,
            // validate: (input) => isEmail(input),
          })}
          
          placeholder="Input Your Email Address"
        />
        {/* <input className='sign-input'
          name="password"
          type='password'
          required
          minLength='6'
          ref={register({
            required: true,
            minLength: 6,
          })}
          
          placeholder="Password"
        />*/}
        <button className='sign-submit'
        type="submit" 
        disabled={formState.isSubmitting}>
          Submit
        </button> 

        <div className='error-message'>{error}</div>
        <hr className="hr-text" data-content="OR"></hr>

        <Link to='/signup'>
          <Button className='sign-create' color='warning'
          // type="submit" 
          // disabled={formState.isSubmitting}
          >
            Create New Account
          </Button>
        </Link>

        <Link to='/signin'>
          <Button color="link" className='sign-reset'>Already Have An Account?</Button>
        </Link>
      </form>

    </div>
  );
}

  export default Reset