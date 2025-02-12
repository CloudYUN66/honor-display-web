import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminPage.css';

function AdminPage() {
  const [mainTitle, setMainTitle] = useState('2025年度荣誉风云榜');
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);

  const handleTitleChange = async (e) => {
    e.preventDefault();
    try {
      await fetch('http://192.168.20.47:/api/update-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: mainTitle }),
      });
      alert('标题更新成功！');
    } catch (error) {
      console.error('Error updating title:', error);
      alert('更新失败，请重试');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await fetch('http://192.168.20.47:3001/api/import-winners', {
        method: 'POST',
        body: formData,
      });
      alert('数据导入成功！');
    } catch (error) {
      console.error('Error importing data:', error);
      alert('导入失败，请重试');
    }
  };

  const handleImportData = async () => {
    try {
      setImporting(true);
      const response = await fetch('http://192.168.20.47:3001/api/import-data', {
        method: 'POST',
      });
      
      if (response.ok) {
        alert('数据导入成功！');
      } else {
        throw new Error('导入失败');
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('导入失败，请重试');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="admin-page">
      <h1>后台管理</h1>
      
      <section className="admin-section">
        <h2>修改主标题</h2>
        <form onSubmit={handleTitleChange}>
          <input
            type="text"
            value={mainTitle}
            onChange={(e) => setMainTitle(e.target.value)}
            placeholder="输入新的标题"
          />
          <button type="submit">更新标题</button>
        </form>
      </section>

      <section className="admin-section">
        <h2>导入获奖人员数据</h2>
        <form onSubmit={handleFileUpload}>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">导入数据</button>
        </form>
      </section>

      <section className="admin-section">
        <h2>导入JSON数据</h2>
        <button 
          className="import-button"
          onClick={handleImportData}
          disabled={importing}
        >
          {importing ? '导入中...' : '导入数据'}
        </button>
      </section>

      <Link to="/" className="back-button">
        返回首页
      </Link>
    </div>
  );
}

export default AdminPage; 