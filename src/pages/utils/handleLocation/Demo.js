import React, { useState, useEffect } from 'react';
import getLocation from '@/H5Public/utils/handleLocation';
export default function Test() {

  const [location, setLocation] = useState({});

  const setInfo = (location) => {
    setLocation(location);
  };

  useEffect(()=>{
    getLocation(setInfo);
  },[])

  return (
    <div id="baiduMap">
      {JSON.stringify(location)}
    </div>
  );
}
