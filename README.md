<div align="center">

# 🚀 Portfolio Website

### Modern, Responsive, and Animated Portfolio

[![Made with React](https://img.shields.io/badge/React-19.1-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Powered by Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

[Live Demo](https://baransel.site) · [Report Bug](https://github.com/inalbaransel/portfolio/issues) · [Request Feature](https://github.com/inalbaransel/portfolio/issues)

</div>

---

## ✨ Features

- 🎨 **Modern Design** - Clean, professional UI with smooth animations
- 📱 **Fully Responsive** - Optimized for all devices (mobile, tablet, desktop)
- 🌊 **Smooth Scrolling** - Lenis smooth scroll with GSAP integration
- 🎭 **Interactive Animations** - GSAP-powered scroll-triggered animations
- 📬 **Contact Form** - Firebase Firestore integration for messages
- ⚡ **Lightning Fast** - Built with Vite for optimal performance
- 🎯 **SEO Optimized** - Meta tags and semantic HTML
- 🔒 **Secure** - Environment variables for sensitive data

## 🛠️ Tech Stack

### Frontend

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.13-0AE448?style=flat-square&logo=greensock&logoColor=white)
![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-000000?style=flat-square)

### Backend & Tools

![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat-square&logo=firebase&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat-square&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.8-CA4245?style=flat-square&logo=reactrouter&logoColor=white)

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm installed on your machine

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/inalbaransel/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

   Then fill in your Firebase credentials in `.env`:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser.

5. **Build for production**
   ```bash
   npm run build
   ```

## � Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── assets/         # Images, fonts, etc.
│   │   └── images/     # Project images
│   ├── components/     # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   └── ...
│   ├── sections/       # Homepage sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Work.jsx
│   │   └── ...
│   ├── hooks/          # Custom React hooks
│   ├── firebase.js     # Firebase configuration
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .env                # Environment variables (not in git)
├── .env.example        # Environment variables template
├── .gitignore
├── package.json
├── vite.config.js      # Vite configuration
└── README.md
```

## � Environment Variables

This project uses environment variables to keep sensitive Firebase configuration secure.

| Variable                            | Description                  |
| ----------------------------------- | ---------------------------- |
| `VITE_FIREBASE_API_KEY`             | Firebase API Key             |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase Auth Domain         |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase Project ID          |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase Storage Bucket      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID`              | Firebase App ID              |

> ⚠️ **Important:** Never commit `.env` file to version control. Use `.env.example` as a template.

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/inalbaransel/portfolio)

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify](https://app.netlify.com/drop)
3. Or connect via Git and set environment variables in Netlify dashboard

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## 📝 Available Scripts

| Command                 | Description                 |
| ----------------------- | --------------------------- |
| `npm run dev`           | Start development server    |
| `npm run dev -- --host` | Start dev server on network |
| `npm run build`         | Build for production        |
| `npm run preview`       | Preview production build    |
| `npm run lint`          | Run ESLint                  |

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Baransel İnal**

- Portfolio: [baransel.site](https://baransel.site)
- GitHub: [@inalbaransel](https://github.com/inalbaransel)
- LinkedIn: [Baransel İnal](https://linkedin.com/in/baranselinal)

---

<div align="center">

Made with ❤️ by Baransel İnal

⭐ Star this repo if you like it!

</div>
