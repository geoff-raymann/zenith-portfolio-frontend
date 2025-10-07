# Zenith Portfolio

A modern, AI-powered portfolio for Geoffrey Odiwour, featuring a beautiful responsive design, contact form, and **Geoff AI**—an LLM-powered assistant that can answer questions about Geoffrey’s skills, projects, and services.

---

## Features

- **Responsive Portfolio Website**  
  Showcases projects, skills, experience, and more.

- **Contact Form**  
  Sends emails directly to Geoffrey’s inbox using secure SMTP.

- **Geoff AI**  
  An interactive AI assistant (powered by local Ollama LLM or cloud LLMs) that can answer questions about Geoffrey, recommend services, and more.  
  - **Voice chat** support (browser speech recognition)
  - **Mobile-friendly** and Copilot-inspired UI
  - **Navbar auto-hide** for immersive chat

- **Easy to Customize**  
  All content and AI context can be updated for your needs.

---

## Getting Started

### 1. **Clone the Repository**

```sh
git clone https://github.com/yourusername/zenith-portfolio.git
cd zenith-portfolio/zenith-portfolio-frontend
```

### 2. **Install Dependencies**

```sh
npm install
```

### 3. **Configure Environment Variables**

Copy `.env.local.example` to `.env.local` and fill in your values:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CONTACT_RECEIVER_EMAIL=your_email@gmail.com

# For Hugging Face (optional, if using cloud LLM)
HUGGINGFACE_API_KEY=hf_...

# For Ollama (local LLM, recommended for dev)
# No API key needed, just run Ollama locally
```

### 4. **Run Ollama (for local AI)**

Install [Ollama](https://ollama.com/download) and pull a model:

```sh
ollama pull llama3
ollama serve
```

### 5. **Start the Development Server**

```sh
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## AI Assistant (Geoff AI)

- **Local (recommended for dev):**  
  Runs on [Ollama](https://ollama.com/) with models like Llama 3, Mistral, Gemma, etc.
- **Cloud (optional):**  
  Can use Hugging Face Inference API or other LLM providers (see `/api/geoff-ai/route.ts`).

---

## Mobile & Accessibility

- Fully responsive design
- Mobile users get a floating menu for navigation on the Geoff AI page
- Voice chat works in supported browsers

---

## Deployment

- For production, switch `/api/geoff-ai/route.ts` to use a cloud LLM (OpenAI, Gemini, Hugging Face, etc.)
- Deploy to Vercel, Netlify, or your preferred platform

---

## License

MIT

---

## Credits

- [Ollama](https://ollama.com/)
- [Hugging Face](https://huggingface.co/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
