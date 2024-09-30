import axiosInstance from './axiosInstance';

export const createArticle = (data: { title: string; content: string }) => {
  return axiosInstance.post('/articles', data);
};

export const fetchArticles = (id?: string) => {  // id를 문자열로 처리
  if (id) {
    return axiosInstance.get(`/articles/${id}`);  // 문자열 id로 조회
  }
  return axiosInstance.get('/articles');  // 전체 목록 조회
};

export const updateArticle = (id: string, data: { title: string; content: string }) => {
  return axiosInstance.patch(`/articles/${id}`, data);  // 문자열 id로 수정
};

export const deleteArticle = (id: string) => {
  return axiosInstance.delete(`/articles/${id}`);  // 문자열 id로 삭제
};
