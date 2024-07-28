import { useState } from "react";
import './styles/App.css';
import PostList from "./components/PostsLists.jsx";
import MyButton from "./components/UI/button/MyButton.jsx";
import MyInput from "./components/UI/input/MyInput.jsx";
import PostForm from "./components/PostForm.jsx";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript 1', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' }
  ])

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost]);
  }

  const deletePost = (post) => {
    setPosts(posts.filter(p => p.id != post.id));
  }

  return (
    <div className="App">
      <PostForm create={createNewPost}/>
      {posts.length !== 0
        ? 
        <PostList remove={deletePost} posts={posts} title="Список постов"/> 
        :
        <h1 style={{textAlign:'center'}}>Постов нет</h1>}
    </div>
  );
}

export default App;
