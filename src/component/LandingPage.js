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
  const signUp = async (e) => {
    console.log(JSON.stringify(signUpForm))
    e.preventDefault()
    var response = await fetch(`${backend}/authentication/signup`,{
      method:'POST',
      headers:{'Content-type': 'application/json'},
      body: JSON.stringify(signUpForm)
    })
    response= await response.json()

    console.log(response)
  }

  const signIn = async (e) => {
    e.preventDefault()
    console.log(signInForm)
    var response = await fetch(`${backend}/authentication/login`,{
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(signInForm)
    })
    response= await response.json()

    if(response.status == 200){
      localStorage.setItem('authtoken', response.token)
      // wrong logic, --> bug
      localStorage.setItem('uid', response.uid)
      window.location.reload()
    }
    
    console.log(response)
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
        <p className="fs-5 text-muted"> A system for conneting to the world at your fingertips connect To experience/ </p>
      </div>

      {/* ********************* Upper ************************ */}
      
      {/* ********************* Card ************************* */}
      <div
        // className="auth_landingpage_card card mb-3 rounded-3 shadow-sm  card-blur-dark"        
        className="auth_landingpage_card mb-3 rounded-3 shadow-sm  card-blur-dark"        
      >

        {/* <div id="id" className="toggler" style={{width:'200%'}}> */}

          {/* -------------- SignIn Form -------------- */}
          <div className='float-left singIn' style={{width:'32rem'}}>

            <h3 className="card-heading text-center bold-text display-8">
              Login
            </h3>

            <hr className="card-hr auth-hr" noshade />

            <div className="card-body" >
              <form >
                <input
                  className="form-control me-2"
                  type="text"
                  name="email"
                  placeholder="email"
                  style={{ width: 'auto' }}
                  onChange={handleSignIn}

                />
                <br />
                <input
                  className="form-control me-2"
                  type="password"
                  name="password"
                  placeholder="password"
                  aria-label="password"
                  style={{ width: '50%' }}
                  onChange={handleSignIn}
                />
                <br />
                {/* <a onClick={ShowSignUp} style={{ marginTop: '-1rem', display:'block', textAlign:'end', color: 'red', cursor: 'pointer' }}> <i>Create a new Account! </i></a> */}
                {/* <br/> */}
                <button className="btn btn-outline-success" width='4rem' onClick={signIn} >
                  Login In
                </button>
              </form>
            </div>

          </div>

            {/* ******* SignUp ******** */}
          <div className='float-left' style={{width:'32rem'}}>
             <h3 className="card-heading bold-text text-center display-8">
              Sign Up
            </h3>

            <hr className="card-hr auth-hr" noshade />

            <div className="card-body" >
              <form >
                <input
                  className="form-control me-2 float-left"
                  type="text"
                  name="name"
                  placeholder="First Name"
                  style={{ width: 'auto' }}
                  onChange={handleSignUp}
                />
                <input
                  className="form-control me-2"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  style={{ width: 'auto' }}
                  onChange={handleSignUp}

                />
                <br />

                <input
                  className="form-control me-2"
                  type="email"
                  name="email"
                  placeholder="email"
                  style={{ width: '50%' }}
                  onChange={handleSignUp}

                />

                <input
                  className="form-control me-2 my-4 float-left "
                  type="password"
                  name="password"
                  placeholder="password"
                  aria-label="password"
                  style={{ width: '45%' }}
                  onChange={handleSignUp}

                />
                <input
                  className="form-control me-2 my-4"
                  type="password"
                  placeholder="Confirm Password"
                  aria-label="password"
                  style={{ width: '45%' }}

                />


                <br />
                {/* <a onClick={ShowSignUp} style={{ marginTop: '-1rem', display:'block', textAlign:'end', color: 'red', cursor: 'pointer' }}> <i>Already have an Account! </i></a> */}
                {/* <br/> */}
                <button className="btn btn-outline-success" width='4rem' onClick={signUp} >
                  Sign Up
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
