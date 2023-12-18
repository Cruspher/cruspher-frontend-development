import React, {useEffect, useState} from 'react'
import {FlexBox} from "../box/flexbox";
import {BsCaretLeft, BsCaretRight} from "react-icons/all";

const Pagination = ({length, rows, page, onChangePage}) => {
  const [paginationArray, setPaginationArray] = useState([])
  const paginationValues =  Math.ceil(length / rows)

  useEffect(() => {
    const arrayToAdd = []
    for (let i=1;i<=paginationValues;i++) {
      arrayToAdd.push(i)
    }

    const updateArray = arrayToAdd.filter(item => item > page - 3 && item < page + 3 )

    setPaginationArray([...updateArray])
  }, [page, paginationValues])


  return (
    <FlexBox style={{margin: '0 auto'}} content='center' items='center'>
      <span
        style={{
          height: '40px',
          display: 'flex',
          alignItems: "center",
          justifyContent:'center',
          border: '1px solid #A50044',
          cursor: "pointer",
          padding: '0px 15px',
          textTransform: 'uppercase',
          borderTopLeftRadius: '15px',
          borderBottomLeftRadius: '15px',
          transform: 'skewX(-15deg)'
        }}
        onClick={() => {
          if ( page - 2 < 0) return
          onChangePage(page - 2)
        }}
      >
        <BsCaretLeft />
      </span>
      {
        paginationArray.map((item) => (
          <span
            key={Math.random().toString()}
            style={{
              background: page === item ? '#A50044' : '',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: "center",
              justifyContent:'center',
              border: '1px solid #A50044',
              cursor: "pointer",
              transform: 'skewX(-15deg)'
            }}
            onClick={() => onChangePage(item - 1)}
          >
            <span style={{transform: 'skewX(15deg)'}}>
              {item}
            </span>
          </span>
        ))
      }
      <span
        style={{
          height: '40px',
          display: 'flex',
          alignItems: "center",
          justifyContent:'center',
          border: '1px solid #A50044',
          cursor: "pointer",
          padding: '0px 15px',
          textTransform: 'uppercase',
          borderTopRightRadius: '15px',
          borderBottomRightRadius: '15px',
          transform: 'skewX(-15deg)'
        }}
        onClick={() => {
          if (page + 1 > paginationValues) return
          onChangePage(page)
        }}
      >
         <BsCaretRight />
      </span>
    </FlexBox>
  )
}


export {
  Pagination
}
