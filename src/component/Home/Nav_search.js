import React, {useState} from 'react'
import './Nav_search.scss'
import Nav_search_row from './Nav_search_row'

const Nav_search = () => {

    const [searchResults, setSearchResults] = useState()

    const handleSearch= async(e)=>{
        let result = await fetch('http://localhost:3001/search', {
            headers: { query: e.target.value }
        })

        result = await result.json()
        console.log('search result: ' + JSON.stringify(result))
        setSearchResults( result.response)

    }

    return (
        <div className='nav-search-container'>
            <div className="boxContainer">
                <table className="elementsContainer">
                    <tr>
                        <td>
                            <input type="text" placeholder="Search"
                                onChange={handleSearch} className="search" />
                        </td>
                        <td >
                            <a href="#"><i className="material-icons">search</i>
                            </a>
                        </td>
                    </tr>
                </table>
            </div>

            {/* ******************** code for search query items ********************* */}
        <div className='search-query-container '>

            { searchResults ?
                searchResults.map( (element)=> {
                    return(
                        <div  className=''>
                            <Nav_search_row key={element._id} _id={element._id} name={element.name} email={element.email} />

                        </div>
                    )
                })
            :
            <h6>loading..</h6>

            }
            {/* <Nav_search_row _id name email /> */}
            {/* <Nav_search_row />
            <Nav_search_row />
            <Nav_search_row /> */}

        </div>
            {/* ********************************************************************* */}

        </div>
    )
}

export default Nav_search