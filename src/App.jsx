import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AwardPage from './pages/AwardPage';
import './App.css';

function App() {
  // 生成指定数量的获奖者数据
  const generateWinners = (count, awardName, isTeam = false) => {
    return Array(count).fill(null).map((_, index) => ({
      id: Math.random().toString(36).substr(2, 9), // 生成随机ID
      name: isTeam ? `优秀团队${index + 1}` : `获奖者${index + 1}`,
      department: isTeam ? '研发中心' : `部门${index + 1}`,
      position: isTeam ? '研发团队' : `职位${index + 1}`,
      reason: isTeam 
        ? '该团队在项目中展现出优秀的协作能力，成功完成多个重要项目的交付。'
        : `在${awardName}评选中表现突出，展现出优秀的专业能力和奉献精神。`,
      avatar: '/images/avatars/default.jpg'
    }));
  };

  const [awards] = useState([
    {
      id: 1,
      name: '披星戴月奖',
      description: '表彰在工作中付出特殊努力的员工',
      winners: generateWinners(62, '披星戴月奖')
    },
    {
      id: 2,
      name: '技术先锋奖',
      description: '表彰在技术领域有突出贡献的员工',
      winners: generateWinners(61, '技术先锋奖')
    },
    {
      id: 3,
      name: '华为云突出贡献销售奖',
      description: '表彰在华为云销售方面表现优异的员工',
      winners: generateWinners(2, '华为云突出贡献销售奖')
    },
    {
      id: 4,
      name: '扬帆起航奖',
      description: '表彰在新领域开拓中表现突出的员工',
      winners: generateWinners(10, '扬帆起航奖')
    },
    {
      id: 5,
      name: '优秀干部奖',
      description: '表彰工作表现优秀的管理人员',
      winners: generateWinners(14, '优秀干部奖')
    },
    {
      id: 6,
      name: '行稳致远奖',
      description: '表彰在持续性工作中表现稳定的员工',
      winners: generateWinners(2, '行稳致远奖')
    },
    {
      id: 7,
      name: '销售领航奖',
      description: '表彰在销售领域表现卓越的员工',
      winners: generateWinners(1, '销售领航奖')
    },
    {
      id: 8,
      name: '开疆拓土奖',
      description: '表彰在市场开拓方面有突出贡献的员工',
      winners: generateWinners(1, '开疆拓土奖')
    },
    {
      id: 9,
      name: '大比武一等奖',
      description: '技术大比武一等奖获得者',
      winners: generateWinners(5, '大比武一等奖')
    },
    {
      id: 10,
      name: '大比武二等奖',
      description: '技术大比武二等奖获得者',
      winners: generateWinners(6, '大比武二等奖')
    },
    {
      id: 11,
      name: '大比武三等奖',
      description: '技术大比武三等奖获得者',
      winners: generateWinners(8, '大比武三等奖')
    },
    {
      id: 12,
      name: '开发者大赛二等奖',
      description: '开发者大赛二等奖获得者',
      winners: generateWinners(2, '开发者大赛二等奖')
    },
    {
      id: 13,
      name: '开发者大赛三等奖',
      description: '开发者大赛三等奖获得者',
      winners: generateWinners(4, '开发者大赛三等奖')
    },
    {
      id: 14,
      name: '卓越贡献奖',
      description: '表彰对公司发展有重要贡献的员工',
      winners: generateWinners(1, '卓越贡献奖')
    },
    {
      id: 15,
      name: '优秀团队奖',
      description: '表彰在团队协作中表现优异的团队',
      winners: generateWinners(13, '优秀团队奖', true),
      isTeam: true
    }
  ]);

  return (
    <Router>
      <div className="background-container">
        <img 
          src="/images/wangzhanbeijing3.jpg" 
          alt="background" 
          className="background-image"
        />
      </div>

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