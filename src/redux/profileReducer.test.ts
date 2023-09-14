import {addPostAC, deletePost, InitialStateType, profileReducer} from "../redux/profileReducer";


const state: InitialStateType = {
    posts: [
        {id: 1, message: "Hi, how a you?", likesCount: 12},
        {id: 2, message: "It's my first post", likesCount: 11},
    ],
    profile: null,
    status: 'Yo'
}

it('length in post should be incremented', () => {
    const action = addPostAC('it-kamasutra.com')

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(3)
})

it('message of new post should be correct', () => {
    const action = addPostAC('it-kamasutra.com')

    const newState = profileReducer(state, action)

    expect(newState.posts[2].message).toBe('it-kamasutra.com')
})

it('after deleting length of messages should be decrement', () => {
    const action = deletePost(1)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(1)
})

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    const action = deletePost(3)

    const newState = profileReducer(state, action)

    expect(newState.posts.length).toBe(2)
})


