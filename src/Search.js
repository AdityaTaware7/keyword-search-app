import React, { useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Search.css'

const Search = () => {
    const [keyword, setKeyword] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                "https://www.googleapis.com/youtube/v3/search",
                {
                    params: {
                        part: "snippet",
                        q: keyword,
                        key: "AIzaSyCjS6tUQmow4dzySPaFRom9tpI-Qbg4dH0",
                        type: "video"
                    }
                }
            );

            // Get the total number of search results
            const totalResults = response.data.pageInfo.totalResults;
            setLoading(false)
            // console.log()
            setSearchResults(totalResults);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    };

    return (
        <div className="search-container">
            {/* <input type="text" value={keyword} onChange={handleKeywordChange} /> */}

            <TextField className=".search-input" id="outlined-basic" value={keyword} onChange={handleKeywordChange} label="Keyword" variant="outlined" />
            {/* <br /> */}
            {/* <button onClick={handleSearch}>Search</button> */}
            <Button style={{ marginTop: "20px" }} variant="contained" onClick={handleSearch}>Search</Button>
            <br />
            <br />

            {loading && <CircularProgress />}

            {searchResults !== null ? (
                <p>Search Volume: {searchResults}</p>
            ) : (
                <p>No search volume data yet.</p>
            )}
        </div>
    );
};

export default Search;
