import React from 'react'

export default function Spinner() {
    return (
        <div style={{marginTop:"180px"}} className="d-flex justify-content-center">
        <div className="spinner-border" style={{width: "5rem",height: "5rem"}} role="status">
        <span className="sr-only">Loading...</span>
        </div>
        </div>
    )
}
