import { useEffect, useMemo, useState } from "react";
import './styles/App.css';
import PostList from "./components/PostsList.jsx";
import MyButton from "./components/UI/button/MyButton.jsx";
import PostForm from "./components/PostForm.jsx";
import PostFilter from "./components/PostFilter.jsx";
import MyModal from "./components/UI/modals/MyModal.jsx";
import Loader from "./components/UI/Loader/Loader.jsx";
import { usePosts } from "./hooks/usePosts.js";
import PostService from "./API/PostService.js";
import { useFetching } from "./hooks/useFetching.js";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'The worst language' },
    { id: 2, title: 'Python', body: 'Scripted language' },
    { id: 3, title: 'GO', body: 'Simple language' }
  ])
  const [filter, setFilter] = useState({ sort: '', search: '' });
  const [modal, setModal] = useState(false);
  const [fetchPosts, isPoastLoading, postError] = useFetching(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  })

  const sortAndSearchedPosts = usePosts(posts, filter.sort, filter.search);

  useEffect(() => {
    fetchPosts();
  }, []);

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
      {postError &&
        <h1>Ошибка</h1>
      }
      {isPoastLoading
        ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
        :
        <PostList remove={deletePost} posts={sortAndSearchedPosts} title="Список постов" />
      }
    </div>
  );
}

export default App;
