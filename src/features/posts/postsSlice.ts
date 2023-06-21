import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { sub } from "date-fns";

const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    userId: "1",
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more i say slice, the more i want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    userId: "2",
    reactions: {
      thumbsUp: 0,
      wow: 0,
      heart: 0,
      rocket: 0,
      coffee: 0,
    },
  },
];

interface PostInterface {
  id: string;
  title: string;
  content: string;
  userId: string;
  date: string;
  reactions: {
    thumbsUp: number;
    wow: number;
    heart: number;
    rocket: number;
    coffee: number;
  };
}

interface PostReactionInterface {
  postId: string;
  reaction: string;
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<PostInterface>) {
        state.push(action.payload);
      },
      prepare: (title: string, content: string, userId: string) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
    reactionAdded(state, action: PayloadAction<PostReactionInterface>) {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        switch (reaction) {
          case "thumbsUp":
            existingPost.reactions["thumbsUp"]++;
            break;
          case "wow":
            existingPost.reactions["wow"]++;
            break;
          case "heart":
            existingPost.reactions["heart"]++;
            break;
          case "rocket":
            existingPost.reactions["rocket"]++;
            break;
          case "coffee":
            existingPost.reactions["coffee"]++;
            break;
          default:
            break;
        }
      }
    },
  },
});

export const postsSelector = (state: RootState) => state.posts;
export const usersSelector = (state: RootState) => state.users;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
