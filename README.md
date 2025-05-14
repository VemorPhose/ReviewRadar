# ReviewRadar

**ReviewRadar** is a Chrome extension that helps users detect potentially fake product reviews on e-commerce platforms like Amazon. Using an in-browser machine learning model trained on the YelpChi dataset, it analyzes reviews in real-time and displays confidence scores or classification tags to enhance trust in online shopping.

---

## 🔍 Features

- ✨ Real-time detection of fake reviews on Amazon
- 📊 Two analysis modes:
  - **Confidence Score Mode** (0–100%)
  - **Classification Mode** (Genuine / Unsure / Fake)
- ⚡ Fast, client-side ML inference using TensorFlow.js
- 🎨 Dark-themed UI built with Tailwind CSS and ShadCN UI
- 🧠 Trained on the YelpChi fake review dataset

---

## 🛠️ Tech Stack

- React + Vite (for Chrome Extension UI)
- JavaScript (no TypeScript)
- Tailwind CSS + ShadCN UI
- TensorFlow.js (for ML inference)
- YelpChi dataset (model training)
- vite-plugin-crx (for extension bundling)

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Chrome browser
- YelpChi-trained model (TF.js format)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/reviewradar.git
   cd reviewradar
   ```

## 📚 References

Salminen, J., Kandpal, C., Kamel, A. M., Jung, S., & Jansen, B. J. (2022). Creating and detecting fake reviews of online products. Journal of Retailing and Consumer Services, 64, 102771. https://doi.org/10.1016/j.jretconser.2021.102771
