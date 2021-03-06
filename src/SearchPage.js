import React from 'react'
import './SearchPage.css'
import { useStateValue } from './StateProvider';
import useGoogleSearch from './useGoogleSearch';
import { Link } from 'react-router-dom';
import Search from './Search'
import  SearchIcon from '@material-ui/icons/Search'
import  DescriptionIcon from '@material-ui/icons/Description'
import  ImageIcon from '@material-ui/icons/Image'
import  LocalOfferIcon from '@material-ui/icons/LocalOffer'
import  RoomIcon from '@material-ui/icons/Room'
import  MoreVertIcon from '@material-ui/icons/MoreVert'

//import Response from './response'

function SearchPage() {
    const [{ term }] = useStateValue();

    //Live API Call
    const { data } = useGoogleSearch(term);

    //Mock API Call
   // const data = Response;

    console.log(data);
    return (
        <div className="searchPage">
            <div className="searchPage_header">
                <Link to="/">
                    <img className="searchPage_logo" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google-Logo"/>
                </Link>
                <div className="searchPage_headerBody">

                    <Search hideButtons />

                    <div className="searchPage_options">
                        <div className="searchPage_optionsLeft">
                            <div className="searchPage_option">
                                <SearchIcon />
                                <Link to="/search">All</Link>
                            </div>
                            <div className="searchPage_option">
                                <DescriptionIcon />
                                <Link to="/search">News</Link>
                            </div>
                            <div className="searchPage_option">
                                <ImageIcon />
                                <Link to="/search">Images</Link>
                            </div>
                            <div className="searchPage_option">
                                <LocalOfferIcon />
                                <Link to="/search">Shopping</Link>
                            </div>
                            <div className="searchPage_option">
                                <RoomIcon />
                                <Link to="/search">Maps</Link>
                            </div>
                            <div className="searchPage_option">
                                <MoreVertIcon />
                                <Link to="/search">more</Link>
                            </div>
                        </div>
                        <div className="searchPage_optionsRight">
                            <div className="searchPage_option">
                                <Link to="/search">Settings</Link>
                            </div>
                            <div className="searchPage_option">
                                <Link to="/search">Tools</Link>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div>
            {term && (
                <div className="searchPage_results">
                    <p className="searchPage_resultCount">About {data && data.searchInformation.formattedTotalResults} results ({data && data.searchInformation.formattedSearchTime} seconds) for {term} </p>
                    {data?.items.map(item => (
                        <div className="searchPage_result">
                            <p>
                                {item.displayLink}
                                </p>
                            <a href={item.link} className="searchPage_resultTitle">
                            {(item.pagemap && item.pagemap.cse_image && item.pagemap.cse_image.length>0 && item.pagemap.cse_image[0].src) ? (
                                    <img src={item.pagemap.cse_image[0].src} className="searchPage_resultImage" alt="title"/>
                                ): (<div></div>)}
                                <h2>{item.title}</h2>
                            </a>
                            <p className="searchPage_resultSnippet">{item.snippet}</p>  
                        </div>
                    ))}
                </div> 
            )}
            
        </div>
    )
}

export default SearchPage
