import react from 'react'

export default function TimeCard({text, value}) {
    return (
        <div className='card'>
            {/* <div className='card-content'> */}
                <label style={{fontSize: '50px'}}>{value}</label>
                <label style={{fontSize: '30px', color: 'GrayText'}}>{text}</label>
            {/* </div> */}
        </div>
    )
}