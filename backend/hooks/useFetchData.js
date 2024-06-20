const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

function useFetchData(apiEndPoint) {
    const [alldata, setAllData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {

        if (initialLoad) {
            // set initialload to false to prevent the api call on subsequent renders
            setInitialLoad(false);
            setLoading(false); // set loading to false to show components initially
            return; // exit useEffect
        }

        setLoading(true);

        const fetchAllData = async () => {
            try {
                const res = await axios.get(apiEndPoint);
                const alldata = res.data;
                setAllData(alldata);
                setLoading(false); // set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching blog data', error);
                setLoading(false); //set loading false even if there's an error
            }
        };

        // fetch blog data only if apiendpoint is exits 
        if (apiEndPoint) {
            fetchAllData();
        }

    }, [initialLoad, apiEndPoint]); // depemd on initialLoad and apiendpoint to trigger

    return { alldata, loading }
}

export default useFetchData;