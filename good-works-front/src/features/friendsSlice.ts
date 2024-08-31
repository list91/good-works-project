import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; 
import { API_HOST } from '../config';

interface Friend {
  id: number;
  username: string;
  tag: string;
  userid: number;
  friendId:number;
  isfriend: boolean;
}

interface FriendsState {
  list: Friend[];
}

const initialState: FriendsState = {
  list: [],
};

export const fetchFriends = createAsyncThunk('friends/fetchFriends', async () => {
  const token = Cookies.get('token');
  const userid = Cookies.get('userid');

  const response = await fetch(`${API_HOST}/friends/${userid}/users-status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Expected data to be an array');
  }
  
  return data;
});

export const addFriendAndFetch = createAsyncThunk(
  'friends/addFriendAndFetch',
  async ({ friendId, friend_name }: { friendId: number; friend_name: string }, { dispatch }) => {
    const token = Cookies.get('token');
    const userid = Cookies.get('userid');
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ friend_tag: friend_name, user_id: userid, friend_id: friendId }),
    }
    console.log(req)
    const response = await fetch(`${API_HOST}/friends`, req);

    if (!response.ok) {
      throw new Error('Could not add friend');
    }

    await dispatch(fetchFriends());
  }
);
export const removeFriendAndFetch = createAsyncThunk(
  'friends/removeFriendAndFetch',
  async ({ friendId }: { friendId: number }, { dispatch }) => {
    const token = Cookies.get('token');
    const userid = Cookies.get('userid');
    const req = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    }
    console.log(req)
    const response = await fetch(`${API_HOST}/friends/${friendId}`, req);

    if (!response.ok) {
      throw new Error('Could not add friend');
    }

    await dispatch(fetchFriends());
  }
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    builder.addCase(addFriendAndFetch.fulfilled, (state, action) => {
    });
    builder.addCase(removeFriendAndFetch.fulfilled, (state, action) => {
    });
  },
});

export const { } = friendsSlice.actions;
export default friendsSlice.reducer;
