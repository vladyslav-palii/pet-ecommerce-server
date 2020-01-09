import React, { useState, useEffect} from 'react';

function App() {

  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const basicUrl = `http://hn.algolia.com/api/v1/search?query=`;
  const [loading, setLoading] = useState(false);

  const fetchNews = (url) => {
    setLoading(true)
    fetch(url)
    .then(result => result.json())
    .then(data => (setNews(data.hits), setLoading(false)))
    .catch(error => console.log(error))
  }

  // useEffect(() => {
  //   fetchNews();
  // }, [searchQuery])

  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchNews(basicUrl+searchQuery);
  }

  const showLoading = () => (loading ? <h1>Loading...</h1> : "")

  const searchForm = () => (<form onSubmit={handleSubmit}>
    <input type="text" value={searchQuery} onChange={handleChange}></input>
    <button>Search news</button>
  </form>)

  const showNews = () => news.map((n, i)=>(<p key={i}>{n.title}</p>));
  

  return (
    <div>
      <h2>News</h2>

      {showLoading()}
      {searchForm()}
      {showNews()}

    </div>
  );

    // TODO: Refactor to ssr with nextjs for better seo

}

export default App;
