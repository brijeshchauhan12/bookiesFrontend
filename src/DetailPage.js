import React from 'react';
import { useNavigate } from 'react-router-dom';

const DetailPage =({data})=>{
     return(
        <>
        <h1>{data.id}</h1>
        <h6>{data.fullName}</h6>
        </>

     )
}

export default DetailPage;