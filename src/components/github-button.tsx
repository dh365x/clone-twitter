import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
  padding: 10px 20px;
  gap: 5px;
  border: 0;
  border-radius: 50px;
  background-color: white;
  color: black;
  font-weight: 500;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 25px;
`;

export default function GithubButton() {
  const navigate = useNavigate();
  const onClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      window.console.log(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="/github-logo.svg" />
      Continue with Github
    </Button>
  );
}
