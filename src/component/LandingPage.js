// storing uid leads to bug
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'
// for top loading bar
import { useLoadingContext } from "react-router-loading";

function LandingPage() {

  const backend = process.env.REACT_APP_BACKEND

    // for top loading bar
    const loadingContext = useLoadingContext(); // and is called just before return

  const navigate = useNavigate();

  const loginPath = () => {
    let path = 'home'
    navigate(path)
  }


  const [signUpForm, setSignUpForm] = useState({})
  const [signInForm, setSignInForm] = useState({})

  const handleSignUp = (e) => {
    setSignUpForm({
      ...signUpForm,  [e.target.name]: e.target.value
    })
    console.log(signUpForm)
  }
  
  const handleSignIn = async (e) =>{
    setSignInForm({
      ...signInForm, [e.target.name]:e.target.value 
    })
    
    console.log(signInForm)
  }

  // loginPath

  function isEmpty(signUpForm) {
    return Object.keys(signUpForm).length===0;
  }


  const [signUpLoading, setSignUpLoading] = useState(false)

  const signUp = async (e) => {

    e.preventDefault()

   if(Object.keys(signUpForm).length==5)
   {
   
    if(signUpForm.password == signUpForm.cpassword)
    {
      
      console.log(JSON.stringify(signUpForm))

    setSignUpLoading(true)

    var response = await fetch(`${backend}/authentication/signup`,{
      method:'POST',
      headers:{'Content-type': 'application/json'},
      body: JSON.stringify(signUpForm)
    })
    response= await response.json()
    
    if(response.message==true)
    {
      setSignUpLoading(false)
      alert("signUp successfully")
    }
    else{
      setSignUpLoading(false)
      alert('SignUp Failed, mail already exists')
    }
  }
  else{
    setSignUpLoading(false)
    alert("enter both  password  and confirm password same.");
    return;
  }
  }  
  }


  const [signInLoading, setSignInLoading] = useState(false)

  const signIn = async (e) => {
    e.preventDefault()

    if(Object.keys(signInForm).length==2)
    {
   
    console.log(signInForm)

    setSignInLoading(true)

    var response = await fetch(`${backend}/authentication/login`,{
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(signInForm)
    })
    response= await response.json()

    if(response.status == 200){

      setSignInLoading(false)

      localStorage.setItem('authtoken', response.token)
      // wrong logic, --> bug
      localStorage.setItem('uid', response.uid)
      window.location.reload()
    }
    else{
      setSignInLoading(false)
      alert("enter valid email and password")
    }
    
  }
else{
  alert("please enter email and password")
  return;
}
  }
  

  // topbar
  loadingContext.done();

  return (
    <>

      {/* ********************* Upper ************************ */}

      <div className="pricing-header p-1 pb-md-4 mx-auto text-center" style={{ marginTop: '2.5rem' }}>
        {/* <h1 className="montserrat display-4 fw-normal" >Track Your Document</h1> */}
        {/* <p className="fs-5 text-muted"> An integrated system for tracking Goverment Document of different department. </p> */}
        <h1 className="text-gradient montserrat display-4 fw-normal" >Connect to Explore!</h1>
        <p className="fs-5 text-muted"> A system for conneting to the world at your fingertips connect To experience. </p>
      </div>

      {/* ********************* Upper ************************ */}
      
      {/* ********************* Card ************************* */}
      <div 
        // className="auth_landingpage_card card mb-3 rounded-3 shadow-sm  card-blur-dark"        
        className="auth_landingpage_card mb-3 rounded-3 shadow-sm  card-blur-dark"        
      >

        {/* <div id="id" className="toggler" style={{width:'200%'}}> */}

          {/* -------------- SignIn Form -------------- */}
          <div className='float-left signIn' >

            <h3 className="card-heading text-center bold-text display-8">
              Login
            </h3>

            <hr className="card-hr auth-hr" noshade />

            <div className="card-body" >
              <form id='signInForm' >
                <input
                  className="form-control me-2"
                  type="text"
                  name="email"
                  placeholder="email"
                  style={{}}
                  onChange={handleSignIn}

                />
                <input
                  className="form-control me-2"
                  type="password"
                  name="password"
                  placeholder="password"
                  aria-label="password"
                  style={{ }}
                  onChange={handleSignIn}
                />
                {/* <a onClick={ShowSignUp} style={{ marginTop: '-1rem', display:'block', textAlign:'end', color: 'red', cursor: 'pointer' }}> <i>Create a new Account! </i></a> */}
                {/* <br/> */}
                <button className="btn btn-outline-success" style={{width:'5.2rem'}} onClick={signIn} disabled={signInLoading}>
                  {signInLoading ? 
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  :
                   'Login In'
                  }
                </button>
              </form>
            </div>

          </div>

            {/* ******* SignUp ******** */}
          <div className='float-left signup'>
             <h3 className="card-heading bold-text text-center display-8">
              Sign Up
            </h3>

            <hr className="card-hr auth-hr" noshade />

            <div className="card-body" >
              <form id='signUpForm' className='signUpForm' >
                <div style={{display:'flex', justifyContent:'center'}}>
                <input
                  className="form-control me-2 float-left"
                  type="text" required
                  name="name" id='name'
                  placeholder="First Name"
                  style={{  }}
                  onChange={handleSignUp}
                />
                <input
                  className="form-control me-2 " 
                  type="text" required id='lastname'
                  name="last_name"
                  placeholder="Last Name"
                  style={{}}
                  onChange={handleSignUp}
                />
                </div>

                <input
                  className="form-control me-2 "
                  type="email" required
                  name="email"
                  placeholder="email"
                  // style={{ width:'87%'}}
                  onChange={handleSignUp}

                />

                <div style={{display:'flex', justifyContent:'center'}}>

                <input
                  className="form-control me-2 float-left  "
                  type="password" required id='password'
                  name="password"
                  placeholder="password"
                  aria-label="password"
                  style={{}}
                  onChange={handleSignUp}

                />
                <input
                  className="form-control me-2" required
                  type="password"
                  name='cpassword' id='cpassword'
                  placeholder="Confirm Password" 
                  onChange={handleSignUp}

                  aria-label="password"
                  style={{ }}

                />
                </div>

                <br/>

                {/* <a onClick={ShowSignUp} style={{ marginTop: '-1rem', display:'block', textAlign:'end', color: 'red', cursor: 'pointer' }}> <i>Already have an Account! </i></a> */}
                {/* <br/> */}
                <button className="btn btn-outline-success" style={{width:'5.2rem'}} onClick={signUp} disabled={signUpLoading}>
                {signUpLoading ? 
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  :
                   'Sign Up'
                }
                </button>
              </form>
            </div>
          </div>
        {/* </div> */}
      </div>


    </>
  );
}
export default LandingPage;
