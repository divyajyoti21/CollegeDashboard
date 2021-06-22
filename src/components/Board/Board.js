import {useEffect, useState} from 'react';
import Status from '../Status/Status'
import TableData from '../TableData/TableData';

const BASE_URL = 'http://13.232.99.42/';

export default function Board({boardName, url, setExpandedBoard}) {
    const [data, setData] = useState({});
    const [expand, setExpand] = useState(() => {
        return !!(localStorage.getItem('expanded-board') && localStorage.getItem('expanded-board') !== 'ALL');
    });
    const handleAPI = async (apiURL) => {
        // todo: 1. Now what to do with data:
        const response = await fetch(`${BASE_URL}${apiURL}`);
        const res = await response.json();
        setData({...res.data});
        console.log('APIResponse: ', {res, apiURL});   
    }
    useEffect( () => {
        handleAPI(url)
    }, [url]);

    const sortItems = (event) => {
        // todo: 2. write a logic to sort data according to events
        let sortCriteria = event.target.value;
        let dataSet = data.dataSet.data;
        if (sortCriteria === "value") {
            dataSet.sort((a, b) => (a.value > b.value) ? 1 : -1)
        }
        if (sortCriteria === "label") {
            dataSet.sort((a, b) => (a.label > b.label) ? 1 : -1)
        }
        console.log({
            event,
            data
        });
        setData({...data});
    }

    const handleExpand = (boardName) => {
        // todo: 3. write a logic to handle Expanding of Board/Widget
        /*
            hint: Check methods: setExpandedBoard and setExpand
        */
        if (!expand) {
            setExpandedBoard(boardName)
            setExpand(true)
        } else {
            setExpandedBoard('ALL')
            setExpand(false)
        }
        
        console.log({
            boardName,
            data
        });
    }
    return (
        <div className="board-wrapper">
            <header className="board-header">
                <h3>{boardName}</h3>
                <div className="header-functionality">
                    <select name="sort-option" onChange={sortItems} className="sort-option form-select">
                        <option value="label">Sort by Label</option>
                        <option value="value">Sort by Value</option>
                    </select>
                    <div className="btn btn-primary max-min" onClick={() => handleExpand(boardName)}>
                        {/*todo: 4. Switch between icons based condition of `expand`*/}
                        <i className = {`${(expand) ? "fa fa-minus" :"fa fa-arrows-alt"}`}/>
                    </div>
                </div>
            </header>
            <div className="board-content">
                <div className="data-stats">
                    {data?.stats && <Status stats={data.stats} url={url}/>}
                </div>
                <div className="data-info">
                    {data && <TableData data={data}/>}
                </div>
            </div>
        </div>
    )
}
