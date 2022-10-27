import React from 'react'

export default function signup() {
  return (
    <>
     <form>

  <div class="mb-1 row mx-auto w-50 ">
    <div className="col-sm-7 my-1 ">
      <input type="text" class="form-control" id="inputPassword"/>
    </div>
    <div className="col-sm-7 my-1 ">
      <input type="text" class="form-control" id="inputPassword"/>
    </div>
    <div className="col-sm-7 my-1 ">
      <input type="password" class="form-control" id="inputPassword"/>
    </div>
  </div>
  <div className='col-sm-7 my-1'>
  <input type="submit" value="Create Account" />
  </div>
     </form>

    </>
    
  )
}
