import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AwardPage from './pages/AwardPage';
import './App.css';

function App() {
  const [awards] = useState([
    {
      id: 1,
      name: '披星戴月奖',
      winners: 25,
      description: '表彰在工作中付出特殊努力的员工'
    },
    {
      id: 2,
      name: '技术先锋奖',
      winners: 20,
      description: '表彰在技术领域有突出贡献的员工'
    },
    {
      id: 3,
      name: '华为云突出贡献销售奖',
      winners: 15,
      description: '表彰在华为云销售方面表现优异的员工'
    },
    {
      id: 4,
      name: '扬帆起航奖',
      winners: 12,
      description: '表彰在新领域开拓中表现突出的员工'
    },
    {
      id: 5,
      name: '优秀干部奖',
      winners: 18,
      description: '表彰工作表现优秀的管理人员'
    },
    {
      id: 6,
      name: '行稳致远奖',
      winners: 15,
      description: '表彰在持续性工作中表现稳定的员工'
    },
    {
      id: 7,
      name: '销售领航奖',
      winners: 20,
      description: '表彰在销售领域表现卓越的员工'
    },
    {
      id: 8,
      name: '开疆拓土奖',
      winners: 10,
      description: '表彰在市场开拓方面有突出贡献的员工'
    },
    {
      id: 9,
      name: '大比武一等奖',
      winners: 8,
      description: '技术大比武一等奖获得者'
    },
    {
      id: 10,
      name: '大比武二等奖',
      winners: 12,
      description: '技术大比武二等奖获得者'
    },
    {
      id: 11,
      name: '大比武三等奖',
      winners: 15,
      description: '技术大比武三等奖获得者'
    },
    {
      id: 12,
      name: '开发者大赛二等奖',
      winners: 5,
      description: '开发者大赛二等奖获得者'
    },
    {
      id: 13,
      name: '开发者大赛三等奖',
      winners: 7,
      description: '开发者大赛三等奖获得者'
    },
    {
      id: 14,
      name: '卓越贡献奖',
      winners: 8,
      description: '表彰对公司发展有重要贡献的员工'
    },
    {
      id: 15,
      name: '优秀团队',
      winners: 13,
      description: '表彰在团队协作中表现优异的团队',
      isTeam: true
    }
  ]);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage awards={awards} />} />
          <Route path="/award/:id" element={<AwardPage awards={awards} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 