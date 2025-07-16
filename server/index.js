const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 5500;

// // ✅ Allow requests from frontend
// const corsOptions ={
//     origin:['http://localhost:3001','https://registration-page-v3.vercel.app/'], 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

// ✅ Step 1: Allow multiple origins
const allowedOrigins = [
    'http://localhost:3001',
    'https://registration-page-v3.vercel.app'
  ];
  
  // ✅ Step 2: Configure CORS middleware
  app.use(cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS not allowed from this origin: ' + origin));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true
  }));

app.use(express.json());

// 🔄 Replace with your actual Google Script URL
//deployment without color code
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySACAmYnRu9qLk84dumGxQVL-33TuG2dmVdP4Dss6U43bRGmYA84YWNDLk0ylKgNaK/exec';
//deployment with color code
const GOOGLE_SCRIPT_URL2 = 'https://script.google.com/macros/s/AKfycbxJZt9GwYpyTybArphtnMQ32sgqf9nuV0316JzarNZ9SJVB9TW5b0O6xURHyBB3H1o/exec';
//last row issue solved
const GOOGLE_SCRIPT_URL3 = 'https://script.google.com/macros/s/AKfycbxkAjGAoNEcBWeYuF6fOHdalHJz32mN1SvEXi7QFK9CULS8YdlYWQuk3ZIwJL4F9rWo/exec';
//section to uppercase on appscript v4
const GOOGLE_SCRIPT_URL4 = 'https://script.google.com/macros/s/AKfycbzPzgX-Fb-a9YbCIg6YZ-wqja6A3788QLWBpLXPF4H6DGBh7NmtqRI5geQTXhx3Sc4/exec';
//Final_v5
const GOOGLE_SCRIPT_URL5 = 'https://script.google.com/macros/s/AKfycby9vS-UIYWa5Nd4RcMzRf91P80_jWMFQlX-E9FexwNnuAy703b6apn8NGNeKWy1NOEa/exec';
app.post('/register', async (req, res) => {
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL5, req.body);
    res.send(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error submitting to Google Sheet');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
