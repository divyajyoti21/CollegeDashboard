export default function TableData({data}) {
    return (
        <>
            <div className="thhead">
                <div className="thhead-label">{data?.filter?.label}</div>
                <div className="thhead-value">{data?.filter?.value} %</div>
            </div>
            <div className="trhead">
                <div className="trhead-label">{data?.dataSet?.header[0]}</div>
                <div className="trhead-value">{data?.dataSet?.header[1]}</div>
            </div>
            <div className="tr-wrapper">
                {data.dataSet && data.dataSet.data && data.dataSet.data.map((val, index) => (
                    <div className="tr" style={{color: `${val.color}`}} key={index}>
                        <div className="td">{val.label}</div>
                        <div className="td">{val.value}</div>
                    </div>
                ))}
            </div>
        </>
    )
}
