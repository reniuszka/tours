import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import Tours from './Tours';
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project';
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);
  // we pass in the id
  const removeTour = (id) => {
    // if the tour id does match the id that I am passing in, its the id I want to remove and not place it in that new array. if id doesnt match tour.id its gonna be returned in the array
    const newTours = tours.filter((tour) => tour.id !== id);
    // call setTours to se it to our new newTours
    setTours(newTours);
  };

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      // getting an array
      const tours = await response.json();
      setLoading(false);
      console.log(tours);
      //passing tours tha we have just fetched
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>No Tours Left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            Upload Tours
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      {/* Tour component my tour prop is equal to my tours state value. removeTour prop is equal to removeTour function from above */}
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
