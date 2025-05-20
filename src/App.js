import './App.css';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api';

function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  if (isLoading) 
    return <h1>Loading data...</h1>;
  if (isError) 
    return <h1>Has an error when loading data!</h1>;
  return (
    <div className="App">
      <h1>List status</h1>
      <ul>
        {data.slice(0, 10).map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
