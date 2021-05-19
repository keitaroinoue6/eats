import React from 'react';

export const Foods = (props) => {
  return (
    <>
      フード一覧
      <p>
        restaurantsIdは {props.match.params.restaurantsId} です
      </p>
    </>
  )
}
