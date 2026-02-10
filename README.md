#Bajaj Qualifier 1

A Node.js + Express backend service built for the Bajaj Finserv qualifier, providing mathematical utilities and an AI-powered one-word response endpoint with proper validation and deployment health checks.

🚀 Live API

https://bajaj-qualifier-1-zyvn.onrender.com

📌 Endpoints
GET /health

Checks server status.

Response

{
  "is_success": true,
  "official_email": "deesh1180.be23@chitkarauniversity.edu.in"
}

POST /bfhl

Supports:

Fibonacci sequence

Prime filtering

HCF & LCM

AI single-word response

Example request

{ "fibonacci": 5 }


Example response

{
  "is_success": true,
  "official_email": "deesh1180.be23@chitkarauniversity.edu.in",
  "data": [0, 1, 1, 2, 3]
}

🛠 Tech Stack

Node.js • Express.js • Google Gemini AI • dotenv

▶️ Run Locally
git clone <your-repo-url>
cd bajaj-qualifier-1
npm install


Create .env:

PORT=5000
API_KEY=your_gemini_api_key


Start:

npm start

📧 Contact

deesh1180.be23@chitkarauniversity.edu.in
