// import { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'

// const useGigData = () => {
//     const location = useLocation()
//     const [gigData, setGigData] = useState<CreateGigFormData | null>(null)

//     const url = new URLSearchParams(location.search)

//     useEffect(() => {
//         const fetchGig = (gigId: string) => {
//             fetch(`/api/gigs/${gigId}`)
//                 .then(res => res.json())
//                 .then(result => setGigData(result.data))
//         }
//         const gigid = url.get("gigid") || window.localStorage.getItem("gigid")
//         if (gigid) {
//             fetchGig(gigid as string)
//         }
//     }, [])

//     return gigData
// }

// export default useGigData



import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';


interface GigContextProps {
  gig: CreateGigFormData | null;
}

const GigContext = createContext<GigContextProps | undefined>(undefined);

const useGigData = () => {
  const context = useContext(GigContext);
  if (context === undefined) {
    throw new Error('useGigData must be used within an GigProvider');
  }
  return context;
};

const GigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [gig, setGigData] = useState<CreateGigFormData | null>(null);

  const url = new URLSearchParams(location.search);

  useEffect(() => {
    const fetchGig = (gigId: string) => {
      fetch(`/api/gigs/${gigId}`)
        .then((res) => res.json())
        .then((result) => setGigData(result.data));
    };

    const gigId = url.get('gigId') || window.localStorage.getItem('gigId');
    if (gigId) {
      fetchGig(gigId as string);
    }
  }, [location.search]);

  return (
    <GigContext.Provider value={{ gig }}>
      {children}
    </GigContext.Provider>
  );
};

export { GigProvider };
export default useGigData
