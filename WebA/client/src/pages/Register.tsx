import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance.ts';
import { hideLoading, showLoading } from '../utils/loading.ts';

type RegisterProps = object;

// 登录页面
export const Register: React.FC<RegisterProps> = () => {
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

  const handleLogin = () => {
    navigate('/');
  };

  const handleRegister = async () => {
    try {
      showLoading();
      const response = await axiosInstance.post('/register', {
        username,
        password,
      });
      console.log('Registration successful:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
      setMsg('注册失败');
    } finally {
      hideLoading();
    }
  };

  return (
    <div>
      <h1>Register</h1>
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
