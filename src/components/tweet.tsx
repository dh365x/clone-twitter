import styled from 'styled-components';
import { deleteDoc, doc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { ITweet } from './timeline';
import { auth, db, storage } from '../firebase';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 15px;
`;

const Column = styled.div`
  &:last-child {
    place-self: end;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: 600;
`;

const Payload = styled.p`
  margin: 10px 0px;
  font-size: 18px;
`;

const DeleteButton = styled.button`
  padding: 5px 10px;
  border: 0;
  border-radius: 5px;
  background-color: tomato;
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
`;

export default function Tweet({ tweet, photo, username, userId, id }: ITweet) {
  const user = auth.currentUser;
  const onDelete = async () => {
    const ok = window.confirm('Are you sure you want to delete this tweet?');
    if (!ok || user?.uid !== userId) return;
    try {
      await deleteDoc(doc(db, 'tweets', id));
      if (photo) {
        const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
        await deleteObject(photoRef);
      }
    } catch (error) {
      window.console.log(error);
    } finally {
      //
    }
  };

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>Delete</DeleteButton>
        ) : null}
      </Column>
      <Column>{photo ? <Photo src={photo} /> : null}</Column>
    </Wrapper>
  );
}
