import React, { Suspense } from 'react';
import {useState, useEffect} from 'react';
import UserContext from './components/context/UserContext';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './styles/App.css';
import './styles/sign.css';
import Landing from './pages/landing';
import SignUp from './pages/auth/sign-up';
import SignIn from './pages/auth/sign-in';
import Reset from './pages/auth/reset';
import firebase from 'firebase';
import NewProfile from './pages/protected/new-profile';

const Home= React.lazy(() => import('./pages/protected/Home'));




function App() {

  // let x=2;
  const [user, setUser]= useState(null);
  
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(user=>{
      // console.log(user); 
      setUser(user)
    })
  },[])

  function signIn(data){
    // console.log(firebase.auth().currentUser);
    // firebase.auth().onAuthStateChanged(user=>{setUser(user)})
    setUser(data);

  }


  return (
    <Router>
      <UserContext.Provider value={user}>
      <Switch>
        <Route exact path='/'>
         <Landing/>       
        </Route>
        
        
        <Route path='/signup'  >
          <SignUp
          setUser={signIn}
            
          />
          
        </Route>
        <Route path='/signin' >
          <SignIn
            setUser={signIn}
            // user={user}
          />
        </Route>
        <Route path='/reset'>
          <Reset/>
        </Route>
        <Route path='/create-profile'>
          <NewProfile/>
        </Route>

        <Suspense fallback={null}>
          <Route path='/home'>
            <Home/>
          </Route>
        </Suspense>

      </Switch>
      </UserContext.Provider>
    </Router>
    // <div className="App">
     
    //   <Sidebar/>
      
      
    // </div>
  );
}

export default App;