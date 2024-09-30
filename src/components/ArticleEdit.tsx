import React, { useState, useEffect } from 'react';
import { fetchArticles, updateArticle } from '../api/articlesApi';
import { useParams, useNavigate } from 'react-router-dom';

const ArticleEdit = () => {
  const { id } = useParams<{ id: string }>();  // id는 string | undefined 타입
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error("ID가 없습니다.");  // id가 없을 때 처리
      return;
    }

    const getArticle = async () => {
      try {
        const response = await fetchArticles(id);  // id로 글 가져오기
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    getArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) return;  // id가 없으면 수정 중단

    const updatedArticle = {
      title,
      content,
      modifiedAt: new Date().toISOString(),
    };
    try {
      await updateArticle(id, updatedArticle);
      navigate(`/view/${id}`);  // 수정 후 해당 글로 이동
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Title" 
        required 
      />
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Content" 
        required 
      />
      <button type="submit">완료하기</button>
      <button type="button" onClick={() => navigate(`/view/${id}`)}>글 조회</button>
    </form>
  );
};

export default ArticleEdit;
