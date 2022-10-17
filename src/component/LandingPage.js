import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './LandingPage.css'

function LandingPage() {

  const navigate = useNavigate();

  const loginPath = () => {
    let path = 'home'
    navigate(path)
  }

  const ShowSignUp = () => {
    console.log("hello world")
    const c = document.getElementById("id")
    console.log(c.classList.toggle("vipul"))
    console.log(c.classList)
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
    var response = await fetch('http://localhost:3001/authentication/signup',{
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
    var response = await fetch('http://localhost:3001/authentication/login',{
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify(signInForm)
    })
    response= await response.json()

    if(response.status == 200){
      localStorage.setItem('auth', response.token)
      window.location.reload()
    }
    
    console.log(response)
  }
  
  return (
    <>
      {/* <div className="row row-cols-1 row-cols-md-2 mb-3 text-center "> */}

      {/* ********************* Upper ************************ */}

      <div className="pricing-header p-1 pb-md-4 mx-auto text-center" style={{ marginTop: '2.5rem' }}>
        {/* <h1 className="montserrat display-4 fw-normal" >Track Your Document</h1> */}
        {/* <p className="fs-5 text-muted"> An integrated system for tracking Goverment Document of different department. </p> */}
        <h1 className="montserrat display-4 fw-normal" >Connect to Explore!</h1>
        <p className="fs-5 text-muted"> A system for conneting to the world at your fingertips connect To experience/ </p>
      </div>

      {/* ********************* Upper ************************ */}

      {/* ==================================================== */}
      {/* ==================================================== */}


      {/* ********************* Card ************************* */}
      <div
        className="card mb-3 rounded-3 shadow-sm  card-blur-dark"
        style={{
          border: "10px solid transparent",
          backdropFilter: "blur(0.5rem)",
          boxShadow: "1.3rem 1.3rem 1.3rem rgba(255, 255, 255, 0.5)",
          backgroundColor: "rgba(225, 225, 225, 0.1)",
          position: "fixed",
          right: "8rem",
          top: "16rem",
          // top: "1rem",
          width: '40%',
          height:'53%',
          overflow:'hidden'
          // overflowWrap: 'normal'
        }}
      >

        <div id="id" className="toggler" style={{width:'200%'}}>

          {/* SignIn Form */}
          <div className='float-left' style={{width:'32rem'}}>

            <h3 className="card-heading bold-text display-8">
              Login
            </h3>

            <hr className="card-hr" noshade />

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
                <a onClick={ShowSignUp} style={{ marginTop: '-1rem', display:'block', textAlign:'end', color: 'red', cursor: 'pointer' }}> <i>Create a new Account! </i></a>
                {/* <br/> */}
                <button className="btn btn-outline-success" width='4rem' onClick={signIn} >
                  Login In
                </button>
              </form>
            </div>

          </div>

            {/* ******* SignUp ******** */}
          <div className='float-left' style={{width:'32rem'}}>
             <h3 className="card-heading bold-text display-8">
              Sign Up
            </h3>

            <hr className="card-hr" noshade />

            <div className="card-body" >
              <form >
                <input
                  className="form-control me-2 float-left"
                  type="text"
                  // name="first_name"
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
                <a onClick={ShowSignUp} style={{ marginTop: '-1rem', display:'block', textAlign:'end', color: 'red', cursor: 'pointer' }}> <i>Already have an Account! </i></a>
                {/* <br/> */}
                <button className="btn btn-outline-success" width='4rem' onClick={signUp} >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>


    </>
  );
}
export default LandingPage;
