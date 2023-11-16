import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Unsubscribe } from 'firebase/auth';
import { db } from '../firebase';
import Tweet from './tweet';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export interface ITweet {
  id: string;
  tweet: string;
  photo?: string;
  userId: string;
  username: string;
  createdAt: number;
}

export default function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, 'tweets'),
        orderBy('createdAt', 'desc'),
        limit(25)
      );
      unsubscribe = await onSnapshot(tweetsQuery, (snapshot) => {
        const allTweet = snapshot.docs.map((doc) => {
          const { tweet, photo, userId, username, createdAt } = doc.data();
          return {
            id: doc.id,
            tweet,
            photo,
            userId,
            username,
            createdAt,
          };
        });
        setTweets(allTweet);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}
