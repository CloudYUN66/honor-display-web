const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

// 创建数据库连接
const db = new sqlite3.Database('./awards.db');

app.use(cors());
app.use(express.json());

// 创建表
db.serialize(() => {
  // 创建用户表
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    cpUserId TEXT,
    username TEXT,
    avatar TEXT,
    gender INTEGER,
    mobile TEXT,
    email TEXT,
    departmentId INTEGER,
    departmentName TEXT,
    position TEXT,
    jobNumber TEXT,
    placeName TEXT,
    status TEXT,
    entryTime TEXT
  )`);

  // 创建奖项表
  db.run(`CREATE TABLE IF NOT EXISTS awards (
    id INTEGER PRIMARY KEY,
    meetingId INTEGER,
    titleId INTEGER,
    meetingName TEXT,
    titleName TEXT,
    userId INTEGER,
    username TEXT,
    mobile TEXT,
    awardDesc TEXT,
    email TEXT,
    departmentName TEXT,
    createTime TEXT
  )`);
});

// API 路由
app.get('/api/awards', (req, res) => {
  const query = `
    SELECT a.*, u.avatar, u.departmentName 
    FROM awards a
    LEFT JOIN users u ON a.userId = u.id
    ORDER BY a.titleId, a.id
  `;
  
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    // 按奖项分组
    const groupedAwards = rows.reduce((acc, award) => {
      if (!acc[award.titleName]) {
        acc[award.titleName] = {
          id: award.titleId,
          name: award.titleName,
          description: `${award.meetingName} - ${award.titleName}`,
          winners: []
        };
      }
      
      acc[award.titleName].winners.push({
        id: award.id,
        name: award.username,
        avatar: award.avatar || 'default-avatar.png',
        department: award.departmentName,
        title: award.position || '',
        description: award.awardDesc || ''
      });
      
      return acc;
    }, {});

    res.json(Object.values(groupedAwards));
  });
});

// 导入数据的辅助函数
const importData = () => {
  const awardsData = require('./awards.json').data.records;
  const usersData = require('./user.json').data.records;

  // 导入用户数据
  const insertUser = db.prepare(`
    INSERT OR REPLACE INTO users (
      id, cpUserId, username, avatar, gender, mobile, email,
      departmentId, departmentName, position, jobNumber,
      placeName, status, entryTime
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  usersData.forEach(user => {
    insertUser.run([
      user.id, user.cpUserId, user.username, user.avatar,
      user.gender, user.mobile, user.email, user.departmentId,
      user.departmentName, user.position, user.jobNumber,
      user.placeName, user.status, user.entryTime
    ]);
  });

  // 导入奖项数据
  const insertAward = db.prepare(`
    INSERT OR REPLACE INTO awards (
      id, meetingId, titleId, meetingName, titleName,
      userId, username, mobile, awardDesc, email,
      departmentName, createTime
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  awardsData.forEach(award => {
    insertAward.run([
      award.id, award.meetingId, award.titleId,
      award.meetingName, award.titleName, award.userId,
      award.username, award.mobile, award.awardDesc,
      award.email, award.departmentName, award.createTime
    ]);
  });
};

// 启动服务器时导入数据
importData();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 