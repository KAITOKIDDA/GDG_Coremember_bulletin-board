import React, { useEffect, useState } from 'react';
import { fetchArticles, deleteArticle } from '../api/articlesApi';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getArticles = async () => {
      const response = await fetchArticles();
      setArticles(response.data);
    };
    getArticles();
  }, []);

  const handleView = (id: string) => {
    navigate(`/view/${id}`);  // id로 조회 페이지로 이동
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();  // 삭제 버튼을 클릭해도 글 조회가 안 되도록 이벤트 전파 중단
    await deleteArticle(id);
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div>
      <h1>글 목록</h1>
      <button onClick={() => navigate('/create')}>글 작성</button>
      {articles.map(article => (
        <div 
          key={article.id} 
          className="article-card"  // 스타일을 추가하여 구획을 디자인
          onClick={() => handleView(article.id)}  // div 클릭 시 조회 페이지로 이동
          style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', cursor: 'pointer' }}
        >
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <button onClick={(e) => handleDelete(article.id, e)}>삭제</button>  {/* 삭제 버튼 */}
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
