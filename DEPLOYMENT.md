# 文档站点部署指南

## 方案一：GitHub Pages（推荐）

### 自动部署（已配置）

1. **启用 GitHub Pages**
   - 进入你的 GitHub 仓库
   - 点击 `Settings` > `Pages`
   - 在 `Source` 下选择 `GitHub Actions`

2. **推送代码**
   ```bash
   git add .
   git commit -m "Add docs deployment workflow"
   git push origin main
   ```

3. **查看部署状态**
   - 进入 `Actions` 标签页查看部署进度
   - 部署成功后，文档会发布到 `https://<username>.github.io/<repo-name>/`

4. **配置自定义域名（可选）**
   - 在仓库 `Settings` > `Pages` > `Custom domain` 添加你的域名
   - 在你的 DNS 提供商添加 CNAME 记录指向 `<username>.github.io`

### 手动部署

```bash
# 构建文档
pnpm docs:build

# 进入构建输出目录
cd docs/.vitepress/dist

# 初始化 git 仓库并推送到 gh-pages 分支
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:<username>/<repo-name>.git main:gh-pages

cd -
```

---

## 方案二：Vercel（推荐，零配置）

1. **导入项目**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 `Import Project`
   - 选择你的 GitHub 仓库

2. **配置构建设置**
   - Framework Preset: `VitePress`
   - Root Directory: `docs`
   - Build Command: `pnpm docs:build`
   - Output Directory: `docs/.vitepress/dist`
   - Install Command: `pnpm install`

3. **环境变量（可选）**
   - 如果需要，可以在 Vercel 设置环境变量

4. **部署**
   - 点击 `Deploy`
   - 每次推送到 main 分支会自动部署

---

## 方案三：Netlify

1. **导入项目**
   - 访问 [netlify.com](https://netlify.com)
   - 点击 `Add new site` > `Import an existing project`
   - 选择你的 GitHub 仓库

2. **配置构建设置**
   - Base directory: `docs`
   - Build command: `pnpm docs:build`
   - Publish directory: `docs/.vitepress/dist`

3. **创建 netlify.toml 配置文件**（可选）
   ```toml
   [build]
     base = "docs"
     command = "pnpm docs:build"
     publish = ".vitepress/dist"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

---

## 方案四：自己的服务器（Nginx）

1. **构建文档**
   ```bash
   pnpm docs:build
   ```

2. **上传到服务器**
   ```bash
   # 使用 scp 或 rsync
   rsync -avz docs/.vitepress/dist/ user@your-server:/var/www/html/
   ```

3. **配置 Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/html;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # 启用 gzip 压缩
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

---

## 方案五：Cloudflare Pages

1. **连接 GitHub**
   - 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
   - 连接你的 GitHub 账号

2. **创建项目**
   - 选择你的仓库
   - 配置构建设置：
     - Build command: `pnpm docs:build`
     - Build output directory: `docs/.vitepress/dist`
     - Root directory: `docs`

3. **部署**
   - 每次推送会自动部署
   - 支持自定义域名

---

## 本地预览

在部署前，可以本地预览构建后的文档：

```bash
# 构建文档
pnpm docs:build

# 预览构建结果
pnpm docs:preview
```

---

## 注意事项

1. **Base Path 配置**
   - 如果部署到子路径（如 GitHub Pages 的 `/<repo-name>/`），需要在 `docs/.vitepress/config.mjs` 中设置 `base: '/repo-name/'`

2. **环境变量**
   - 可以通过环境变量 `BASE_PATH` 动态设置 base 路径

3. **构建优化**
   - 已启用代码分割和压缩
   - 生产环境会移除 console 日志

4. **缓存**
   - 静态资源会自动添加 hash，支持长期缓存
