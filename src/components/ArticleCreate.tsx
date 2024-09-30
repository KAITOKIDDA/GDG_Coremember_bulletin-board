import React, { useState } from 'react';
import { createArticle } from '../api/articlesApi';
import { useNavigate } from 'react-router-dom';

const ArticleCreate = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArticle = {
      title,
      content,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      author: '임의의 작성자'  // author 필드 추가
    };

    try {
      const response = await createArticle(newArticle);  // 서버에 새 글 저장 후 응답 받기
      const createdArticleId = response.data.id;  // 서버에서 반환된 id 값
      navigate(`/view/${createdArticleId}`);  // 작성된 글의 id로 view 페이지로 이동
    } catch (error) {
      console.error('Error creating article:', error);
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
      <button type="submit">글 작성</button>
      <button type="button" onClick={() => navigate('/')}>글 목록</button>
    </form>
  );
};

export default ArticleCreate;
