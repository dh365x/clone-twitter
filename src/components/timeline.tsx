import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';

const Wrapper = styled.div``;

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

  const fetchTweets = async () => {
    const tweetsQuery = query(
      collection(db, 'tweets'),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(tweetsQuery);
    const allTweet = snapshot.docs.map((doc) => {
      const { tweet, photo, userId, username, createdAt } = doc.data();
      return { id: doc.id, tweet, photo, userId, username, createdAt };
    });
    setTweets(allTweet);
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  return <Wrapper>{JSON.stringify(tweets)}</Wrapper>;
}
