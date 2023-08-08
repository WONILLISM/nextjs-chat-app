# Next.JS Chat App

## ✅ Intro
`NextJS 13`과 `socket.io`를 이용한 채팅 서비스

### 📚 기술 스택

**Laguage & Environment**  
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" /><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white" /><img src="https://img.shields.io/badge/javascript-F7DF1E?style=flat&logo=javascript&logoColor=black" /><img src="https://img.shields.io/badge/typescript-3178C6?style=flat&logo=typescript&logoColor=white" />  

<img src="https://img.shields.io/badge/NodeJS-v18.16.1-339933?style=flat&logo=nodedotjs&logoColor=white" />  
<img src="https://img.shields.io/badge/Yarn-v1.22.17-2C8EBB?style=flat&logo=yarn&logoColor=white" />  


**Library & Framework**  
<img src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=flat&logo=React&logoColor=white" />
<img src="https://img.shields.io/badge/Next.js-v13.4.12-000000?style=flat&logo=nextdotjs&logoColor=white" /> 

**Tools**  
<img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=flat&logo=VisualStudioCode&logoColor=white" />
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=GitHub&logoColor=white" />

**Deploy**  
<img src="https://img.shields.io/badge/Vercel-000000?style=flat&logo=Vercel&logoColor=white" />

### 🙋 프로젝트 실행 방법

터미널에서 아래를 순서대로 입력해주세요.

```
> git clone https://github.com/WONILLISM/nextjs-chat-app.git
> cd next-chat-app
> yarn
> yarn run dev
# 빌드 후 실행
> yarn run build
> yarn run start
```

### 폴더구조
```
├── prisma
│   ├── dev.db
│   ├── dev.db-journal
│   ├── migrations
│   │   ├── 20230805064714_init
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── public
│   ├── Loading.gif
│   ├── auth_img.jpeg
│   └── google_logo.png
├── src
│   ├── app
│   │   ├── (protected)
│   │   │   ├── chat
│   │   │   │   ├── [chatId]
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (public)
│   │   │   ├── layout.tsx
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   └── register
│   │   │       └── page.tsx
│   │   ├── api
│   │   │   └── auth
│   │   │       └── [...nextauth]
│   │   │           ├── options.ts
│   │   │           └── route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   └── page.tsx
│   ├── components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Loading.tsx
│   │   ├── TextField.tsx
│   │   └── provider
│   │       └── AuthProvider.tsx
│   ├── lib
│   │   └── prisma.ts
│   ├── pages
│   │   └── api
│   │       └── socket
│   │           ├── chat.ts
│   │           └── io.ts
│   └── types
│       ├── chat.ts
│       └── next.ts
├── tailwind.config.js
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```


## 사용 기술
**next-auth** : 인증 / 인가 및 소셜 로그인 관리  

**OAuth + JWT** : 소셜 로그인을 통하여 로그인한 사용자만 서비스를 사용가능 하도록하고, JWT 방식을 사용해 유효한 회원인지 확인  

**Socket.io** : 실시간 양방향 통신을 위한 `socket.io`사용

**Prisma + Sqlite** : 유저 목록과 해당 유저의 채팅 내용 및 채팅방을 저장하기 위한 db(아직 미구현)


### 로그인 Flow
<img width="3278" alt="Untitled" src="https://github.com/WONILLISM/nextjs-chat-app/assets/47653005/c98e5fe6-e79e-40e4-88c8-d9eaf79a15e5">


