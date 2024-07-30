import { useMemo, useState } from "react";
import './styles/App.css';
import PostList from "./components/PostsList.jsx";
import MyButton from "./components/UI/button/MyButton.jsx";
import MyInput from "./components/UI/input/MyInput.jsx";
import PostForm from "./components/PostForm.jsx";
import { MySelect } from "./components/UI/select/MySelect.jsx";
import PostFilter from "./components/PostFilter.jsx";
import MyModal from "./components/UI/modals/MyModal.jsx";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'The worst language' },
    { id: 2, title: 'Python', body: 'Scripted language' },
    { id: 3, title: 'GO', body: 'Simple language' }
  ])
  const [filter, setFilter] = useState({ sort: '', search: '' });
  const [modal, setModal] = useState(false);

  const sortedPosts = useMemo(() => {
    if (filter.sort) {
      return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
    }

    return posts;
  }, [filter.sort, posts]);

  const sortAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.search.toLowerCase()));
  }, [filter.search, sortedPosts]);

  const createNewPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  }

  const deletePost = (post) => {
    setPosts(posts.filter(p => p.id != post.id));
  }


  return (
    <div className="App">
      <MyButton style={{ marginTop: 30 }} onClick={() => { setModal(true) }}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createNewPost} />
      </MyModal>
      <hr style={{ margin: '15px 0' }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      <PostList remove={deletePost} posts={sortAndSearchedPosts} title="Список постов" />
    </div>
  );
}

export default App;
