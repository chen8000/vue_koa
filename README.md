## 安装依赖
```
npm install
```

### 运行
```
前端: 
  npm run serve
  npm run build
```
```
后端：
  npm run dev
  npm run prd
```

### 项目结构
```
  前端（client）

  ├── src                             
  │   ├── components        # 公共组件
  │   ├── modules           # 项目模块js
  │   ├── views             # 路由页面
  │   ├── route             # 路由相关目录
  │   ├── store             # vuex
  │   ├── tools             # 工具箱 静态方法
  │   ├── vue.use.js        # Vue use
  │   └── vue.prototype.js  # 给vue原型上绑定方法
  └── vue.config.js         # vue 配置文件
```

```
  后端（server）
  
  ├── api      # api
  ├── bin      # 服务配置
  ├── db       # 数据库相关配置
  ├── model    # sequelize model
  ├── routes   # 路由
  └── views    # 前端build文件
```
