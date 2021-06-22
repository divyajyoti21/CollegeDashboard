import {Fragment} from 'react'

export default function Status({stats, url}) {
    return (
        <>
            <h4 className="stats-heading">STATS:</h4>
            {Object.keys(stats).map((val, index) => (
            <Fragment key={index}>
                <label className="download-label">{stats[val].label}</label>
                <div className="meter">
                    <span style={{width: `${stats[val].value}%`}}><span className="progress"></span></span>
                </div>
            </Fragment>
            ))}
            <a href={`http://13.232.99.42/${url}`} target="_blank" className="view-api" download><span className="view-api-title">View API</span><span className="fa fa-arrow-right fa-lg"></span></a>
        </>
    )
}
