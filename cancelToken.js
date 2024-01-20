import React, { useState, useEffect } from "react";
import axios from "axios";

const CancelToken = axios.CancelToken;

const App = () => {
  const [data, setData] = useState([]);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);

  useEffect(() => {
    // Create a CancelTokenSource object
    const source = CancelToken.source();

    // Set the CancelTokenSource object in state
    setCancelTokenSource(source);

    // Make an Axios request with the CancelToken option
    axios
      .get("/api/users", {
        cancelToken: source.token,
      })
      .then((response) => {
        // Handle the response
        setData(response.data);
      })
      .catch((error) => {
        // Handle the error
      });

    // Return a function that will be called when the component unmounts
    return () => {
      // Cancel the request
      source.cancel();
    };
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
