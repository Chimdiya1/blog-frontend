import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Home from './pages/home/home.component'
import Dashboard from './pages/dashboard/dashboard'
import LogIn from './pages/login/login.component'
import BlogPost from './pages/blogPost/blogPost'
import CreateBlog from './pages/createBlog/createBlog.component'
import EditBlog from './pages/editBlog/editBlog.component'
import SignUp from './pages//signup/signup.component'
import './App.css';
import { Switch, Route } from 'react-router-dom';
import AuthService from './services/auth.service'
import Header from './components/header/header.component'
import ProtectedRoute from './pages/protectedRoute/protectedRoute'

function App() {
  const [user, setUser] = useState({})
  const [authenticated, setAuthenticated] = useState(true)
  async function checkUser() {
    try {
      const user = await AuthService.getCurrentUser();
      setUser(user);
      setAuthenticated(true);
      console.log(user);
    } catch (err) {
      setUser({});
      setAuthenticated(false);
    }
  }
  useEffect(() => {
    console.log('here')
    checkUser()
  },[])
  
  return (
    <div className="App">
      <Header user={user} authenticated={authenticated} />
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute
          exact
          path="/blog/create"
          redirect={'/'}
          authenticated={authenticated}
          user={user}
          component={CreateBlog}
        />
        <ProtectedRoute
          exact
          path="/blog/edit/:id"
          redirect={'/'}
          authenticated={authenticated}
          user={user}
          component={EditBlog}
        />
        <Route exact path="/blog/:id" component={BlogPost} />
        <ProtectedRoute
          exact
          path="/login"
          redirect={'/'}
          authenticated={!authenticated}
          component={LogIn}
        />
        <ProtectedRoute
          exact
          path="/dashboard"
          redirect={'/login'}
          authenticated={authenticated}
          user={user}
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/signup"
          redirect={'/'}
          authenticated={!authenticated}
          component={SignUp}
        />
      </Switch>
    </div>
  );
}

export default App;
