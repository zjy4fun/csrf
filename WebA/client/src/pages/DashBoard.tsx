import React from 'react';
import { getCookie } from '../utils/cookie.ts';
import { hideLoading, showLoading } from '../utils/loading.ts';
import axiosInstance from '../api/axiosInstance.ts';

export const DashBoard: React.FC = () => {
  const username = getCookie('username');

  const handleTransfer = async () => {
    try {
      showLoading();
      const response = await axiosInstance.get('/transfer', {
        name: 'Alice',
        amount: 100,
      });
      console.log('Transfer success:', response.data);
    } catch (e) {
      console.error('Transfer failed:', e);
    } finally {
      hideLoading();
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>Welcome, {username}!</div>
      <button onClick={handleTransfer}>转钱</button>
    </div>
  );
};
