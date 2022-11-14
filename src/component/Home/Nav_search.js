import React from 'react'
import './Nav_search.css'
import Nav_search_row from './Nav_search_row'

const Nav_search = () => {
    return (
        <div className='nav-search-container'>
            <div className="boxContainer">
                <table className="elementsContainer">
                    <tr>
                        <td>
                            <input type="text" placeholder="Search"
                                className="search" />
                        </td>
                        <td >
                            <a href="#"><i className="material-icons">search</i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>

            {/* ******************** code for search query items ********************* */}
        <div className='search-query-container'>

            <Nav_search_row />
            <Nav_search_row />
            <Nav_search_row />
            <Nav_search_row />

        </div>
            {/* ********************************************************************* */}

        </div>
    )
}

export default Nav_search