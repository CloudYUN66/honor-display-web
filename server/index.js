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
    SELECT 
      a.*,
      u.avatar,
      u.departmentName as userDepartment,
      u.position
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
        userId: award.userId,
        name: award.username,
        avatar: award.avatar || '/default-avatar.png',  // 使用用户表中的头像
        department: award.userDepartment || award.departmentName, // 优先使用用户表中的部门
        title: award.position || '',
        description: award.awardDesc || ''
      });
      
      return acc;
    }, {});

    res.json(Object.values(groupedAwards));
  });
});

// 添加导入数据的路由
app.post('/api/import-data', (req, res) => {
  try {
    // 先清空现有数据
    db.run("DELETE FROM users");
    db.run("DELETE FROM awards");
    
    const awardsData = require('./awards.json').data.records;
    const usersData = require('./user.json').data.records;

    // 导入用户数据
    const insertUser = db.prepare(`
      INSERT INTO users (
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
    insertUser.finalize();

    // 导入奖项数据
    const insertAward = db.prepare(`
      INSERT INTO awards (
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
    insertAward.finalize();

    console.log('数据导入完成');
    res.json({ success: true, message: '数据导入成功' });
  } catch (error) {
    console.error('导入数据失败:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 