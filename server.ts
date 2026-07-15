/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: "10mb" }));

// In-Memory Database for persistent experience during dev/session
const orders: any[] = [
  {
    id: "ORD-98231",
    title: "Mrs.",
    fullName: "Adebimpe Adesina",
    email: "bimpe.adesina@gmail.com",
    phone: "+234 803 111 2222",
    address: "Ijapo Estate, Akure, Ondo State",
    patientName: "Chief Samuel Adesina",
    patientAge: "78",
    patientGender: "Male",
    medicalCondition: "Hypertension & Early Alzheimer's Support",
    mobilityStatus: "Assisted (Needs walking stick or support)",
    requirements: ["Home Care", "Personal Care", "Medication Management", "Dementia Care"],
    duration: "Long-Term",
    startDate: "2026-07-20",
    emergencyContact: "Adebimpe Adesina",
    emergencyRelation: "Daughter",
    emergencyPhone: "+234 803 111 2222",
    paymentStatus: "Paid Consultation Deposit",
    paymentReference: "AGH-PAY-88219A",
    status: "Approved & Assigned Nurse",
    createdAt: "2026-07-14T10:00:00.000Z"
  }
];

const applications: any[] = [];
const contacts: any[] = [];

// Lazy load Google Gen AI
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please provide it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

// ------------------- API ROUTES -------------------

// 1. Get Orders
app.get("/api/orders", (req, res) => {
  res.json({ success: true, data: orders });
});

// 2. Submit Order
app.post("/api/orders", (req, res) => {
  try {
    const {
      title,
      fullName,
      email,
      phone,
      address,
      patientName,
      patientAge,
      patientGender,
      medicalCondition,
      mobilityStatus,
      requirements,
      duration,
      startDate,
      additionalNotes,
      emergencyName,
      emergencyRelation,
      emergencyPhone,
      paymentReference,
      paymentStatus
    } = req.body;

    if (!fullName || !phone || !patientName) {
      return res.status(400).json({ success: false, error: "Missing mandatory fields (Client Name, Phone, Patient Name)." });
    }

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      title,
      fullName,
      email,
      phone,
      address,
      patientName,
      patientAge,
      patientGender,
      medicalCondition,
      mobilityStatus,
      requirements: requirements || [],
      duration,
      startDate,
      additionalNotes,
      emergencyContact: emergencyName,
      emergencyRelation,
      emergencyPhone,
      paymentReference: paymentReference || `AGH-REF-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentStatus: paymentStatus || "Pending Consultation Payment",
      status: "Submitted (Awaiting Callback)",
      createdAt: new Date().toISOString()
    };

    orders.unshift(newOrder);

    // Simulated email trigger console log
    console.log(`[ALERT] New Care Request submitted for Patient: ${patientName}. Initiating coordinator routing to +234803...`);

    res.status(201).json({ success: true, data: newOrder });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Simulated Payment Verification
app.post("/api/payment/simulate", (req, res) => {
  try {
    const { orderId, cardType, amount } = req.body;
    const paymentRef = `AGH-PAY-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Find order and update payment status
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.paymentStatus = "Paid Consultation Deposit";
      order.paymentReference = paymentRef;
      order.status = "Confirmed & Scheduling Nurse";
    }

    res.json({
      success: true,
      reference: paymentRef,
      message: "Payment successfully secured via Amazing Grace payment gateway simulation.",
      amount: amount || 15000,
      currency: "NGN",
      transactionDate: new Date().toISOString()
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Careers application submission
app.post("/api/careers/apply", (req, res) => {
  try {
    const { jobId, fullName, email, phone, bio, resumeUrl } = req.body;
    const application = {
      id: `APP-${Math.floor(1000 + Math.random() * 9000)}`,
      jobId,
      fullName,
      email,
      phone,
      bio,
      resumeUrl: resumeUrl || "resume_uploaded.pdf",
      status: "Under Review",
      createdAt: new Date().toISOString()
    };
    applications.push(application);
    res.json({ success: true, data: application });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Contact message submission
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const contact = {
      id: `MSG-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString()
    };
    contacts.push(contact);
    res.json({ success: true, message: "Message submitted successfully." });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Gemini AI Chatbot assistant for elderly care
app.post("/api/chatbot", async (req, res) => {
  try {
    const { prompt, history } = req.body;
    if (!prompt) {
      return res.status(400).json({ success: false, error: "Prompt is required." });
    }

    let ai;
    try {
      ai = getAi();
    } catch (apiError: any) {
      // Return a professional mock response if the key is missing or invalid
      console.warn("AI Init warning:", apiError.message);
      return res.json({
        success: true,
        text: "Hello! I am Grace, your care consultant. I notice that the Gemini API Key is not configured yet in the Settings secrets. Rest assured, Amazing Grace Homecare in Akure, Ondo State is always active! How can I assist you today with booking 24/7 nursing care, assisted living, or our specialized stroke recovery services?"
      });
    }

    const systemInstruction = `
You are Grace, the official compassionate AI Senior Care Consultant for 'Amazing Grace Homecare for the Elderly', located in Akure, Ondo State, Nigeria (Road 1, Phase 2, Ireakari 111, Oke-Aro/Orita Obele, Akure).
Your primary audience are families (often in Nigeria or the diaspora in the UK/US/Canada) looking for trustworthy, high-quality, clinical, and compassionate support for their senior parents or relatives.

Your personality:
- Warm, comforting, patient, deeply respectful, and highly professional.
- Empathetic and reassuring.
- Expert in senior health tips, dementia management, elderly diet, and stroke recovery support.

Amazing Grace Homecare key parameters to reference when relevant:
- Address: Road 1, Phase 2, Ireakari 111, Oke-Aro/Orita Obele, Akure, Ondo State, Nigeria.
- Medical Director: Dr. Adebayo Folorunsho, a seasoned Geriatric Specialist.
- Chief Nurse: Mrs. Funmilayo Adesida.
- We offer 18 customized services: Assisted Living, 24-Hour Nursing Care, Alzheimer's & Dementia Care, Stroke Recovery, Physiotherapy Assistance, Meal Prep (including healthy Nigerian diets), and Respite care.
- We offer both home care services and premium residential assisted living in Akure.
- Families can easily book a "Free Care Assessment" or "Order Now" to secure a custom plan.

Instructions:
- Keep responses comforting, professional, objective, and structurally elegant.
- Avoid extreme lengths. Keep answers under 150 words.
- Highlight our dedication to dignifying elderly citizens.
- If asked about fees, note that they are fully customized based on care levels and can be estimated upon a free nursing assessment.
`;

    // Construct contents
    const contents: any[] = [];
    if (history && Array.isArray(history)) {
      history.forEach((h: any) => {
        contents.push({
          role: h.role,
          parts: [{ text: h.text }]
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: prompt }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text || "I am here to guide and support your family with the highest level of grace and clinical safety."
    });

  } catch (error: any) {
    console.error("Chatbot API Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Vite Middleware & Static Fallback Setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
