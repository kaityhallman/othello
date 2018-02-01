import React from 'react';
import styled from 'styled-components';

function Square(props) {
  const Wrapper = styled.button`
    border: 1px solid #999;
    float: left;
    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
    height: 50px;
    margin-right: -1px;
    margin-top: -1px;
    padding: 0;
    text-align: center;
    width: 50px;

    &:focus {
      outline: none;
    }
  `;

  const Piece = styled.div`
    background-color: ${props.color};
    border-radius: 50%;
    height: 100%;
    width: 100%;
  `;

  return (
    <Wrapper
      onClick={() => props.onClick()}
    >
      <Piece />
    </Wrapper>
  );
}

export default Square;
