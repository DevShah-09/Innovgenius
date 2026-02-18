# INNOVGENIUS: Intelligent Customer Onboarding Agent

**INNOVGENIUS** is a next-generation banking onboarding agent designed to streamline Know Your Customer (KYC) and Anti-Money Laundering (AML) processes. By leveraging agentic AI, real-time risk scoring, and multimodal interactions, it reduces onboarding friction while maintaining rigorous compliance standards.

The project bridges fully functional core logic with visionary UI prototypes to demonstrate the future of secure, compliant, and user-friendly banking enrollment.

---

## Key Features

### Phase 1: Fully Functional (Live)
*Focus: Technical Implementation, API Integration, Logic*

- **Zero-Form Onboarding**: seamless data extraction from identity documents via live camera feed using agentic OCR.
- **Shadow Agent (Voice of Compliance)**: Invisible background process screening users against AML and Sanctions lists in real-time.
- **Real-Time Risk & Compliance**: Logic engine that instantly highlights errors and calculates behavioral/document risk scores.
- **Seamless Human Handoff**: Intelligent routing to human officers with AI-generated risk summaries for complex cases.
- **Multimodal Conversational Guidance**: Natural language interface (Voice + Text) guiding users through the lifecycle.

### Phase 2: UI-Only Prototypes (Visionary)
*Focus: UX Design, Vision AI Overlays, Future Integration*

- **Deepfake & Liveness Guardian**: Interactive UI challenges (e.g., "Nod your head") to verify human presence.
- **Adaptive Compliance Intelligence**: Dynamic UI that adjusts verification steps based on simulated risk.
- **Regulatory Auto-Adaptation**: Admin dashboard for hot-swapping compliance rules.
- **Guided Journey & Accessibility**: Vision AI overlays and "Read For Me" modes.
- **Automated PII Masking**: Visual demonstrations of sensitive data redaction.

---

## Technology Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (React 19)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Shadcn UI](https://ui.shadcn.com/), Radix UI, Lucide React
- **Animations**: Tailwind Animate

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Server**: Uvicorn
- **Validation**: Pydantic
- **Image Processing**: Pillow (PIL)
- **HTTP Client**: Requests

---

## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js (v18+ recommended)
- Python (v3.8+)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Innovgenius
```

### 2. Backend Setup
Navigate to the backend directory and set up the Python environment.

```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the backend server
uvicorn main:app --reload
```
The backend API will be available at `http://localhost:8000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and start the development server.

```bash
cd frontend

# Install dependencies
npm install
# or
# yarn install
# pnpm install

# Run the development server
npm run dev
```
The frontend application will be available at `http://localhost:3000`.

---

## Project Structure

```
Innovgenius/
├── backend/            # Python FastAPI application
│   ├── app/            # Application logic (routes, services, models)
│   ├── main.py         # Entry point
│   └── requirements.txt
│
├── frontend/           # Next.js application
│   ├── src/            # Source code
│   │   ├── app/        # App router pages
│   │   ├── components/ # Reusable UI components
│   │   └── lib/        # Utilities
│   ├── public/         # Static assets
│   └── package.json
│
└── README.md           # Project documentation
```

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License.
