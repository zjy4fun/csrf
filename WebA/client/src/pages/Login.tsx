// client/src/pages/Login.tsx
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../utils/loading.ts';

type LoginProps = object;

export const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      showLoading();
      const response = await axiosInstance.post('/login', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      document.cookie = `username=${username}; path=/;`;
      navigate('/dashboard');
      console.log('Navigating to /dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setMsg('登录失败');
    } finally {
      hideLoading();
    }
  };

  const handleRegister = async () => {
    navigate('/register');
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="用户名"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="密码"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleLogin}>登录</button>
      <button onClick={handleRegister}>注册</button>
      <div>{msg}</div>
    </div>
  );
};
