import React from 'react'

const Filter = ({nameFilter, filterNames}) => {

    return(
        <div>
            filter shown with:
            <input value={nameFilter}
                onChange={filterNames}
            />
        </div>
    )
}

export default Filter