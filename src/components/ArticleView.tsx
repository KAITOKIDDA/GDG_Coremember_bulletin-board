import React, { useEffect, useState } from 'react';
import { fetchArticles, deleteArticle } from '../api/articlesApi';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleView = () => {
  const [article, setArticle] = useState<any>(null);
  const { id } = useParams<{ id: string }>();  // id는 string | undefined 타입
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error("ID가 없습니다.");  // id가 없을 때 처리
      return;
    }

    const getArticle = async () => {
      try {
        const response = await fetchArticles(id);  // id가 있으면 API 호출
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    getArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;  // id가 없을 경우 삭제 요청 중단
    try {
      await deleteArticle(id);
      alert('글이 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>작성일: {article.createdAt}</p>
      <p>수정일: {article.modifiedAt}</p>
      <p>{article.content}</p>
      <button onClick={() => navigate('/')}>글 목록</button>
      <button onClick={() => navigate(`/edit/${id}`)}>글 수정</button>
      <button onClick={handleDelete}>글 삭제</button>
    </div>
  );
};

export default ArticleView;
