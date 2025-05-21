import Header from "../../../components/header/header";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // API呼び出し
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('ログインに失敗しました');
      }

      const data = await response.json();
      console.log('ログイン成功', data);

      // トップページなどへ遷移
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <Header title="管理者ログイン" />
      <div style={{ padding: '1rem' }}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div>
          <label>メールアドレス：</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード：</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>ログイン</button>
      </div>
    </div>
  );
};

export default LoginPage;
