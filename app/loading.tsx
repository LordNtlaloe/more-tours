import React from 'react'

export default function Loading() {
    return (
        <div>
            <div id="preloader">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}
