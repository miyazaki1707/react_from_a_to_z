import PostItem from './PostItems';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const PostList = ({ posts, title, remove }) => {
    if (posts.length == 0) {
        return (
            <h1 style={{ textAlign: 'center' }}>Постов нет</h1>
        )
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>{title}</h1>
            <TransitionGroup className="todo-list">
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post">
                        <PostItem remove={remove} number={index + 1} post={post} />
                    </CSSTransition>)}
            </TransitionGroup>
        </div>
    )
};

export default PostList