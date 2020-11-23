import React from 'react';
import {useState} from 'react';
import {Link, useHistory } from "react-router-dom";
import logoThree from '../../components/resource/logoThree.svg'
import { useForm } from "react-hook-form";
import { Button } from 'reactstrap'
import firebase from 'firebase'



function SignUp(props) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  const history= useHistory();

  const [error, setError]= useState(null);

  const [stillSubmitting, setSubmitting]= useState(false);

  function onSubmit(data) {
    setSubmitting(true);
    console.log(data);
    const auth= firebase.auth();
    auth.createUserWithEmailAndPassword(data.email, data.password)
    .then(firebase.auth().onAuthStateChanged(user=>props.setUser(user)))
    // .then(console.log(firebase.auth().currentUser))
    .then(()=>{
      setSubmitting(false);
      history.push('/create-profile')
    })
    .catch(e=> {setSubmitting(false); setError(e.message)})
  }

  return (
    <div className='sign-body wow wobble' data-wow-duration="1.5s">
      
      <Link to='/'className='sign-logo'>
        S<img className='logoSign' src={logoThree}/>ulmate(s)
      </Link>
        
      

      <form onSubmit={handleSubmit(onSubmit)} className='sign-contain'>
        <input className='sign-input'
          name="username"
          // maxLength= '20'
          // minLength= '3'
          // pattern= '/^[A-Za-z]+$/i'
          // required
          ref={register({
            required: {value:true, message:'*Username cannot be blank'},
            minLength: {value: 3, message:'*Username must be at least 3 letters'},
            maxLength: {value: 20, message:'*Username cannot be more than 20 letters'},
            // pattern: /^[A-Za-z]+$/i,
          })}
          
          placeholder="Enter your username"
        />
        {
          errors.username && <div className='text-left text-danger' >{errors.username.message}</div>
        }
        <input className='sign-input'
          type='email'
          name="email"
          // required
          ref={register({
            required: {value:true, message:'*Email cannot be blank'},
            // validate: (input) => isEmail(input),
          })}
          
          placeholder="Email"
        />
        {
          errors.email && <div className='text-left text-danger' >{errors.email.message}</div>
        }
        <input className='sign-input'
          name="password"
          type='password'
          // required
          // minLength='6'
          ref={register({
            required: {value:true, message:'*Password cannot be blank'},
            minLength: {value: 6, message:'*Password must be at least 6 letters'},
          })}
          
          placeholder="Password"
        />
         {
          errors.password && <div className='text-left text-danger' >{errors.password.message}</div>
        }

        <button className='sign-submit'
        type="submit" 
        disabled={formState.isSubmitting||stillSubmitting}>
          Register
        </button>

        <div className='error-message'>{error}</div>
        <hr className="hr-text" data-content="OR"></hr>
        <Link to='/signin'>
          <Button color="link" className='sign-reset'>Already Have An Account?</Button>
        </Link>
      </form>

    </div>
  );
}

  export default SignUp