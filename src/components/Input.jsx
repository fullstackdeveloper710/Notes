import React from 'react'

function Input({ label,id, ...rest }) {
    return (
        <div className='input_group'>
           {label&& <label htmlFor={id}>{label}</label>}
            <input id={id} {...rest} />
        </div>
    )
}

export default Input