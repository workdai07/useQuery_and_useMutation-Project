import './App.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, createPost  } from './api';
import { useState } from 'react';

function App() {

  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(['posts'], (oldPosts) => [newPost, ...oldPosts]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutation.mutate({ title, body: 'Demo content', userId: 1 });
    setTitle('');
  };

  if (isLoading) 
    return <h1>Loading data...</h1>;
  if (isError) 
    return <h1>Has an error when loading data!</h1>;
  return (
    <div className="App">
      <h1>List status</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Status title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? 'Loading...' : 'Create new status'}
        </button>
      </form>

      <ul>
        {posts.slice(0, 10).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
