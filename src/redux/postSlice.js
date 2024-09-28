import axios from "axios";
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPostThunk = createAsyncThunk('posts/fetchPostThunk',async()=>{
    const pro = await axios.get('https://dummyjson.com/posts?limit=10')
    console.log(pro.data);
    return pro.data.posts
})

const postSlice = createSlice({
    name:'posts',
    initialState:{
        posts:[],
        loading:false,
        error:""
    },
    reducers:{
        addPost(state,action){
            state.posts.push(action.payload)
        },
        addLike(state,action){
            const existing = state.posts.find((item)=>item.id==action.payload)
            existing.reactions.likes+=1
        },
        addDislike(state,action){
            const existing = state.posts.find((item)=>item.id==action.payload)
            if(existing.reactions.dislikes>0){
                existing.reactions.dislikes-=1
            }
        },
        deletePost(state,action){
            state.posts=state.posts.filter((item)=>item.id!=action.payload)
        },
        editPost(state,action){

            const index = state.posts.findIndex(item => item.id == action.payload.id)

            if (index !== -1) {
                state.posts[index] = action.payload;
            }
            // state.posts = state.posts.filter(item=>item.id!=action.payload.id)
            // state.posts.push(action.payload)
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchPostThunk.pending,(state,action)=>{
            state.loading=true
        }),
        builder.addCase(fetchPostThunk.fulfilled,(state,action)=>{
            state.loading=false
            state.posts=action.payload
        }),
        builder.addCase(fetchPostThunk.rejected,(state,action)=>{
            state.loading=false
            state.posts=[]
            state.error="Api Request Failed!!!"
        })

    }
})

export default postSlice.reducer
export const {addPost,addLike,addDislike,deletePost,editPost} = postSlice.actions