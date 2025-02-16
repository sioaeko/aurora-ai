# 🌈 Prism Chat

<div align="center">
  
  ![CleanShot 2025-02-01 at 17 14 46](https://github.com/user-attachments/assets/b98ebd72-4e9b-46b7-8455-97cf140c9686)


  <p align="center">
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="MIT License" />
  </p>

  <h3>Powerful AI Chat Platform based on Deepseek R1</h3>

  <p>
    <b>
      <a href="#-features">Features</a> •
      <a href="#-getting-started">Getting Started</a> •
      <a href="#-installation">Installation</a> •
      <a href="#-usage">Usage</a> •
      <a href="#-tech-stack">Tech Stack</a>
    </b>
  </p>

  [English](README.md) | [한국어](README.ko.md)
</div>

## ✨ Features

- 🤖 **Multiple Model Sizes** - Choose from various Deepseek R1 models:
  - 1.5B - Ultra-lightweight model for basic tasks
  - 7B - Efficient model for everyday use
  - 8B - Enhanced lightweight model
  - 14B - Balanced model for diverse tasks
  - 32B - Large model with superior comprehension
  - 70B - Advanced model for complex tasks
  - 671B - Ultimate model for maximum performance
- 🔄 **Automatic Model Switching** - Seamlessly switch between installed Ollama models in the UI
- 🌍 **Multilingual** - Korean/English interface
- 💬 **Chat Management** - Save and manage conversation history
- 🎨 **Theme Options** - Light/Dark/System theme
- 📱 **Responsive Design** - Optimized experience across all devices
- ⌨️ **Convenient Input** - Send messages with Enter key (configurable)
- 🔤 **Font Size Control** - Small/Medium/Large settings

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- [Ollama](https://ollama.ai) installed with Deepseek R1 model

### Installation

1. Clone repository
```bash
git clone https://github.com/sioaeko/prism-chat.git
cd prism-chat
```
2. Install dependencies
```bash
npm install
```

3. Run Ollama and download Deepseek R1 model (choose your preferred size)
```bash
# For 14B model (default)
ollama run deepseek-r1:14b

# For other sizes
ollama run deepseek-r1:1.5b  # Ultra-lightweight
ollama run deepseek-r1:7b    # Efficient
ollama run deepseek-r1:8b    # Enhanced lightweight
ollama run deepseek-r1:32b   # Large
ollama run deepseek-r1:70b   # Advanced
ollama run deepseek-r1:671b  # Ultimate
```

4. Start development server
```bash
npm run dev
```

## 💻 Usage

### Starting a Chat

1. Click "New Chat" button to start a new conversation
2. Select your preferred model size from the dropdown menu
3. Enter your question or request in the message input
4. Send message using Enter key (if enabled) or send button

### Model Selection

The model selector in the UI automatically detects and uses any Deepseek R1 model installed through Ollama. When you select a different model size in the UI:

- If the selected model is installed, it will be used immediately for the current chat
- Each chat maintains its own model selection
- New chats will use the currently selected model by default

### Managing Settings

- **Theme**: Choose Light/Dark/System theme in sidebar settings
- **Font Size**: Select Small/Medium/Large
- **Language**: Choose Korean/English
- **Enter Key**: Configure message sending with Enter key

## 🛠 Tech Stack

<div align="center">
  <table>
    <tr>
      <td align="center" width="96">
        <img src="https://techstack-generator.vercel.app/react-icon.svg" alt="React" width="48" height="48" />
        <br>React
      </td>
      <td align="center" width="96">
        <img src="https://techstack-generator.vercel.app/ts-icon.svg" alt="TypeScript" width="48" height="48" />
        <br>TypeScript
      </td>
      <td align="center" width="96">
        <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/wind.svg" alt="Tailwind" width="48" height="48" />
        <br>Tailwind
      </td>
      <td align="center" width="96">
        <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/zap.svg" alt="Vite" width="48" height="48" />
        <br>Vite
      </td>
    </tr>
  </table>
</div>

## 📝 License

This project is [MIT](LICENSE) licensed.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

Project Link: [https://github.com/sioaeko/prism-chat](https://github.com/sioaeko/prism-chat)

---

<div align="center">
  <sub>Built with ❤️ by sioaeko</sub>
</div>