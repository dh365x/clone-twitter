import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  height: 100%;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 15px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 20px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  &[type='submit'] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  text-align: center;
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: #1d96f0;
  }
`;
