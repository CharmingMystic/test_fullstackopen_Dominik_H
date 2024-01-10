import React from 'react'

const Filter = ({searchFilter, setSearchFilter}) => {
    return (
      <>
        filter shown with <input value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
      </>
    )
  }

export default Filter