import { useState, useEffect } from 'react';

const CONTEXT_KEY = "e9e3e0fdde0f32093";

const useGoogleSearch = (term) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async() => {
            // use axios instead of fetch
            fetch(
                `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}&cx=${CONTEXT_KEY}&q=${term}`
            )
            .then(response => response.json())
            .then(result => {
                setData(result)
            })
        }

        fetchData();
    },[term])
    return { data }
};

export default useGoogleSearch;

