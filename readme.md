# 2025年度荣誉风云榜

## 项目描述
一个展示公司年度获奖人员的动态展示系统。支持多个奖项类别的轮播展示，每个奖项可以显示获奖者的头像、姓名和获奖描述等信息。

## 项目结构
```
honor-display-web/
├── public/                 # 静态资源
├── server/                 # 后端服务
│   ├── index.js           # 服务器入口文件
│   ├── awards.json        # 奖项数据
│   ├── user.json          # 用户数据
│   └── package.json       # 后端依赖
├── src/                    # 前端源码
│   ├── components/        # React组件
│   ├── styles/            # 样式文件
│   ├── data/             # 静态数据
│   └── App.jsx           # 主应用组件
└── package.json           # 前端依赖
```

## 项目安装
1. 安装前端依赖
```bash
npm install
```

2. 安装后端依赖
```bash
cd server
npm install
```

## 项目运行
1. 启动后端服务
```bash
cd server
node index.js
```
后端服务将在 http://localhost:3001 运行

2. 启动前端服务
```bash
npm start
```
前端页面将在 http://localhost:3000 运行

## 数据同步方式
1. 从OA系统导出数据
   - 访问OA系统获奖记录页面
   - 修改每页条数为1500
   - 导出数据到 awards.json

2. 从OA系统导出用户数据
   - 访问OA系统用户管理页面
   - 修改每页条数为1500
   - 导出数据到 user.json

3. 同步数据到系统
   - 将 awards.json 和 user.json 放入 server 目录
   - 访问系统后台管理页面
   - 点击"导入数据"按钮
   - 等待同步完成提示

## 注意事项
1. 确保 awards.json 中的 userId 与 user.json 中的 id 正确对应
2. 导入数据前会清空现有数据，请谨慎操作
3. 建议定期备份 awards.db 数据库文件