import React from 'react'

const Loading = () => {
    return (
        // using flex to center div
        <div className='my-2 d-flex align-items-center justify-content-center' style={{overflow:'hidden'}}>

            <div className="spinner-border text-light" role="status" style={{marginBottom:'15vh'}}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loading