import React, { useState, useEffect } from 'react';
//import RiHeader from '../Header/RiHeader';           // use your existing header
import './problemset.css';                           // your CSS file

const Problemset = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solvedProblems, setSolvedProblems] = useState(() => {
    const saved = localStorage.getItem('solvedProblems');
    return saved ? JSON.parse(saved) : [];
  });
  const [submissions, setSubmissions] = useState(() => {
    const saved = localStorage.getItem('submissions');
    return saved ? JSON.parse(saved) : {};
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchRating, setSearchRating] = useState('');
  const [searchTag, setSearchTag] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const resp = await fetch('https://codeforces.com/api/problemset.problems');
        const data = await resp.json();
        const list = data.result.problems.map(p => ({
          name: `${p.contestId}.${p.index} ${p.name}`,
          rating: p.rating || 'Unrated',
          id: `${p.contestId}/${p.index}`,
          tags: p.tags
        }));
        setProblems(list);
      } catch (err) {
        console.error('Error fetching problems:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  useEffect(() => {
    localStorage.setItem('solvedProblems', JSON.stringify(solvedProblems));
    localStorage.setItem('submissions', JSON.stringify(submissions));
    localStorage.setItem('solvedCount', solvedProblems.length);
  }, [solvedProblems, submissions]);

  const toggleSolved = (problemId) => {
    setSolvedProblems(prev => {
      if (prev.includes(problemId)) {
        // unmark
        setSubmissions(sub => {
          const { [problemId]: _, ...rest } = sub;
          return rest;
        });
        return prev.filter(id => id !== problemId);
      } else {
        const code = prompt('Please enter your submitted code:');
        if (code) {
          setSubmissions(sub => ({ ...sub, [problemId]: code }));
          return [...prev, problemId];
        }
        return prev;
      }
    });
  };

  const filtered = problems.filter(p => {
    const byName = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const byRating = !searchRating || (p.rating !== 'Unrated' && p.rating === parseInt(searchRating));
    const byTag = !searchTag || p.tags.includes(searchTag);
    return byName && byRating && byTag;
  });

  if (loading) {
    return <div className="loading">Loading problems...</div>;
  }

  return (
    <div className="problemset-container">
      
      <h1 id='head'>ZCODER Problemset</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by problem name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <input
          list="ratings"
          placeholder="Search by rating..."
          value={searchRating}
          onChange={e => setSearchRating(e.target.value)}
        />
        <datalist id="ratings">
          {Array.from({ length: (3500 - 800) / 100 + 1 }, (_, i) => 800 + i * 100).map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </datalist>
        <input
          type="text"
          placeholder="Search by tag..."
          value={searchTag}
          onChange={e => setSearchTag(e.target.value)}
        />
      </div>
      <div className="problems-list">
        {filtered.map((prob, idx) => (
          <div
            className={`problem-card ${solvedProblems.includes(prob.id) ? 'solved' : ''}`}
            key={idx}
          >
            <input
              type="checkbox"
              checked={solvedProblems.includes(prob.id)}
              onChange={() => toggleSolved(prob.id)}
            />
            <h3>{prob.name}</h3>
            <p className="rating">Rating: {prob.rating}</p>
            <div className="tags">
              {prob.tags.map((t, i) => <span className="tag" key={i}>{t}</span>)}
            </div>
            <a
              href={`https://codeforces.com/contest/${prob.id.split('/')[0]}/problem/${prob.id.split('/')[1]}`}
              target="_blank" rel="noopener noreferrer"
            >
              View Problem
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Problemset;
