import React from 'react';
import {useState, useEffect, useContext} from 'react';
import {Link, useHistory } from "react-router-dom";
import logoThree from '../../components/resource/logoThree.svg'
import { useForm } from "react-hook-form";
// import isEmail from "validator/lib/isEmail";
import { Button } from 'reactstrap'
import firebase from 'firebase';
import UserContext from '../../components/context/UserContext';



function SignIn(props) {
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onBlur",
  });

  const history= useHistory();
  const person= useContext(UserContext);

  useEffect(()=>{
    console.log(person)
  },[]
    
  )

  const [error, setError]= useState(null);

  const [stillSubmitting, setSubmitting]= useState(false);

  function onSubmit(data) {
    setSubmitting(true);
    console.log(data);

    const auth= firebase.auth();
    auth.signInWithEmailAndPassword(data.email, data.password)
    .then(()=>auth.onAuthStateChanged(user=>{props.setUser(user)}))
    .then(()=>{
      setSubmitting(false);
      history.push('/home')
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
            required: {value:true, message:'*Password cannot be blank'}
            // minLength: 6,
          })}
          
          placeholder="Password"
        />
        {
          errors.password && <div className='text-left text-danger' >{errors.password.message}</div>
        }
        <button className='sign-submit'
        type="submit" 
        disabled={formState.isSubmitting||stillSubmitting}>
          Sign In
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

        <Link to='/reset'>
          <Button color="link" className='sign-reset'>Forgotten Password?</Button>
        </Link>
      </form>

    </div>
  );
}

  export default SignIn