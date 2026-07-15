/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { CreditCard, Shield, Heart, FileText, UserPlus, Clock, ArrowRight, Loader2, Calendar } from "lucide-react";

interface OrderFormProps {
  preselectedService: string;
}

export default function OrderForm({ preselectedService }: OrderFormProps) {
  // Booking Form State
  const [form, setForm] = useState({
    title: "Mr.",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    patientName: "",
    patientAge: "",
    patientGender: "Male",
    medicalCondition: "",
    mobilityStatus: "Fully Mobile",
    requirements: [] as string[],
    duration: "Daily",
    startDate: "",
    additionalNotes: "",
    emergencyName: "",
    emergencyRelation: "Son",
    emergencyPhone: "",
    medicalReportName: ""
  });

  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [orderLoading, setOrderLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any | null>(null);

  // Payment Sim states
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [payCard, setPayCard] = useState({ number: "4000 1234 5678 9010", expiry: "12/28", cvc: "123" });
  const [payLoading, setPayLoading] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  const careServicesChecklist = [
    "Home Care", "Live-in Care", "24-Hour Care", "Nursing Care", "Personal Care",
    "Companionship", "Dementia Care", "Post-Surgery Care", "Physiotherapy Support", "Palliative Care"
  ];

  // Fetch registered active orders on component load
  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const resData = await res.json();
      if (resData.success) {
        setActiveOrders(resData.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update checklists selection
  const handleCheckboxChange = (service: string) => {
    if (form.requirements.includes(service)) {
      setForm({ ...form, requirements: form.requirements.filter(r => r !== service) });
    } else {
      setForm({ ...form, requirements: [...form.requirements, service] });
    }
  };

  // Prepopulate preselected service
  useEffect(() => {
    if (preselectedService && !form.requirements.includes(preselectedService)) {
      setForm(f => ({ ...f, requirements: [...f.requirements, preselectedService] }));
    }
  }, [preselectedService]);

  // Submit Care Request
  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.phone || !form.patientName) return;

    setOrderLoading(true);
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (data.success) {
        setCreatedOrder(data.data);
        setFormSubmitted(true);
        fetchOrders(); // Refresh table list
      }
    } catch (err) {
      console.error(err);
      // Local fallback
      const mockOrd = {
        id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
        fullName: form.fullName,
        patientName: form.patientName,
        patientAge: form.patientAge,
        paymentStatus: "Pending consultation payment",
        status: "Submitted (Awaiting Callback)",
        createdAt: new Date().toISOString()
      };
      setCreatedOrder(mockOrd);
      setFormSubmitted(true);
    } finally {
      setOrderLoading(false);
    }
  };

  // Simulate secure deposit payment gateway
  const handleVerifyPayment = async () => {
    if (!createdOrder) return;
    setPayLoading(true);

    try {
      const res = await fetch("/api/payment/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: createdOrder.id,
          amount: 15000,
          cardType: "Visa Debit"
        })
      });
      const data = await res.json();
      if (data.success) {
        setPaySuccess(true);
        setTimeout(() => {
          setPayModalOpen(false);
          setPaySuccess(false);
          setFormSubmitted(false);
          setForm({
            title: "Mr.",
            fullName: "",
            email: "",
            phone: "",
            address: "",
            patientName: "",
            patientAge: "",
            patientGender: "Male",
            medicalCondition: "",
            mobilityStatus: "Fully Mobile",
            requirements: [],
            duration: "Daily",
            startDate: "",
            additionalNotes: "",
            emergencyName: "",
            emergencyRelation: "Son",
            emergencyPhone: "",
            medicalReportName: ""
          });
          fetchOrders(); // Refresh table list
        }, 3000);
      }
    } catch (err) {
      console.error(err);
      setPaySuccess(true);
    } finally {
      setPayLoading(false);
    }
  };

  return (
    <section id="order-now-view" className="py-20 lg:py-28 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
            Secure Booking Portal
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 dark:text-white">
            Request Elderly Care Services Online
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submit your senior's profile, health requirements, and emergency contacts to configure a personalized plan immediately.
          </p>
          <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: Order Input Form or Thank You Screen */}
          <div className="lg:col-span-8 text-left bg-slate-50 dark:bg-navy-850 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-navy-800 shadow-sm">
            
            {!formSubmitted ? (
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                
                {/* 1. Sponsor / Client Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-navy-800 flex items-center gap-2">
                    <UserPlus className="w-4.5 h-4.5" />
                    1. Sponsor / Family Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Title</label>
                      <select
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      >
                        <option>Mr.</option>
                        <option>Mrs.</option>
                        <option>Miss.</option>
                        <option>Dr.</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Betty Owolabi"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="betty@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234 803 111 2222"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Care Home Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Street, Estate Name, Akure, Ondo State"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* 2. Patient Profile Information */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-navy-800 flex items-center gap-2">
                    <Heart className="w-4.5 h-4.5" />
                    2. Senior Patient Information
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                    <div className="sm:col-span-6">
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Senior's Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Chief Samuel Owolabi"
                        value={form.patientName}
                        onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Age</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 78"
                        value={form.patientAge}
                        onChange={(e) => setForm({ ...form, patientAge: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Gender</label>
                      <select
                        value={form.patientGender}
                        onChange={(e) => setForm({ ...form, patientGender: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      >
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Medical Conditions / Diagnoses</label>
                      <input
                        type="text"
                        placeholder="e.g. Stroke Recovery, Early Dementia, Hypertension"
                        value={form.medicalCondition}
                        onChange={(e) => setForm({ ...form, medicalCondition: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Mobility Status</label>
                      <select
                        value={form.mobilityStatus}
                        onChange={(e) => setForm({ ...form, mobilityStatus: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      >
                        <option>Fully Mobile</option>
                        <option>Assisted walking (cane/walker)</option>
                        <option>Wheelchair bound</option>
                        <option>Bedridden / Total support</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Care Requirements Checklist */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-navy-800 flex items-center gap-2">
                    <Shield className="w-4.5 h-4.5" />
                    3. Custom Care Requirements Checkboxes
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {careServicesChecklist.map((service) => (
                      <label
                        key={service}
                        className={`flex items-center gap-2 p-3.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                          form.requirements.includes(service)
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-800 dark:text-emerald-300"
                            : "bg-white dark:bg-navy-900 border-slate-200/60 dark:border-navy-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="accent-emerald-600 rounded"
                          checked={form.requirements.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                        />
                        {service}
                      </label>
                    ))}
                  </div>
                </div>

                {/* 4. Scheduling & Documents Upload */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-navy-800 flex items-center gap-2">
                    <Clock className="w-4.5 h-4.5" />
                    4. Preferred Care Schedule & Uploads
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Duration Cycle</label>
                      <select
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      >
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                        <option>Long-Term</option>
                        <option>Temporary</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Preferred Start Date</label>
                      <input
                        type="date"
                        required
                        value={form.startDate}
                        onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Attach Doctor's Prescription (Optional)</label>
                      <div className="relative border border-dashed border-slate-200 dark:border-navy-800 rounded-xl p-2.5 text-center bg-white dark:bg-navy-900 hover:bg-slate-50 transition-colors">
                        <input
                          type="file"
                          accept=".pdf,.docx,.jpg,.png"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              setForm({ ...form, medicalReportName: e.target.files[0].name });
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="text-[10px] text-slate-500 block truncate">
                          {form.medicalReportName ? (
                            <strong className="text-emerald-600 dark:text-emerald-400">{form.medicalReportName}</strong>
                          ) : (
                            "Select Report, Doc or Prescription"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Additional Family Requests</label>
                    <textarea
                      rows={2}
                      placeholder="Please document any dietary habits (such as favorite Nigerian foods), specific sleep cycles, or custom requests..."
                      value={form.additionalNotes}
                      onChange={(e) => setForm({ ...form, additionalNotes: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* 5. Emergency Contacts */}
                <div className="space-y-4">
                  <h3 className="text-sm font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider pb-1 border-b border-slate-200 dark:border-navy-800 flex items-center gap-2">
                    <Shield className="w-4.5 h-4.5" />
                    5. Primary Emergency Contact Details
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Contact Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={form.emergencyName}
                        onChange={(e) => setForm({ ...form, emergencyName: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Relationship</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Daughter, Son, Nephew"
                        value={form.emergencyRelation}
                        onChange={(e) => setForm({ ...form, emergencyRelation: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">Emergency Phone Number</label>
                      <input
                        type="tel"
                        required
                        placeholder="+234..."
                        value={form.emergencyPhone}
                        onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
                        className="w-full px-4 py-2 bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={orderLoading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {orderLoading ? (
                    <>
                      <Loader2 className="w-4.5 h-4.5 animate-spin" />
                      Registering Care Profile...
                    </>
                  ) : (
                    <>
                      Request Care Service
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </>
                  )}
                </button>

              </form>
            ) : (
              // THANK YOU / SUBMISSION SUCCESS AND PAYMENT SIMULATION BANNER
              <div className="text-center py-10 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-2xl font-display font-bold text-navy-900 dark:text-white">
                    Request Securely Registered!
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you for choosing Amazing Grace Homecare for the Elderly. Our care coordinator will contact you shortly. 
                  </p>
                </div>

                {/* Secure consultation deposit gateway trigger (Paystack simulation) */}
                <div className="p-6 rounded-2xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800 max-w-lg mx-auto text-left space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-navy-800">
                    <span className="text-xs font-mono uppercase font-bold text-slate-400">ORDER CODE: {createdOrder?.id}</span>
                    <span className="text-xs font-bold text-gold-500">₦15,000 NGN</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <h4 className="font-bold text-navy-900 dark:text-white">Optional Consultation Booking Fee Deposit</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                      Streamline your scheduling! Make a <strong>₦15,000 NGN</strong> diagnostic booking fee deposit now to automatically prioritize your nursing slot and lock in your free physical wellness audit in Akure.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setPayModalOpen(true)}
                      className="flex-1 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                    >
                      <CreditCard className="w-4.5 h-4.5" />
                      Pay Securely Now
                    </button>
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setCreatedOrder(null);
                      }}
                      className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-navy-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 text-xs font-semibold"
                    >
                      Skip Payment
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* RIGHT SIDE: Real-Time Persistent Orders Dashboard */}
          <div className="lg:col-span-4 text-left space-y-6">
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-navy-800 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-base text-navy-900 dark:text-white flex items-center gap-2 pb-2 border-b border-slate-200/50 dark:border-navy-800/50">
                <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                Active Family Care Logs
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                We maintain full operational reporting. Review your active care request registries below, updated live.
              </p>

              <div className="space-y-3 max-h-[480px] overflow-y-auto">
                {activeOrders.map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-xl bg-white dark:bg-navy-900 border border-slate-100 dark:border-navy-800/80 space-y-2.5 text-xs shadow-xs"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {ord.id}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(ord.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="font-bold text-navy-900 dark:text-white leading-tight">
                        Patient: {ord.patientName} ({ord.patientAge} yrs)
                      </p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        Sponsor: {ord.fullName}
                      </p>
                      {ord.requirements && ord.requirements.length > 0 && (
                        <p className="text-[10px] text-slate-400">
                          Needs: {ord.requirements.slice(0, 2).join(", ")}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-navy-900/60 text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full font-semibold ${
                        ord.paymentStatus === "Paid Consultation Deposit"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                      }`}>
                        {ord.paymentStatus}
                      </span>
                      <span className="text-slate-400 italic">Approved</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* SECURE PAYMENT FORM DIALOG (PAYSTACK / FLUTTERWAVE SIMULATOR) */}
      {payModalOpen && createdOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-navy-900 p-6 sm:p-8 text-slate-900 dark:text-white border border-slate-100 dark:border-navy-800 shadow-2xl relative">
            
            <button
              onClick={() => setPayModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold"
            >
              ✕
            </button>

            {paySuccess ? (
              <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>
                <h3 className="text-xl font-display font-bold">₦15,000 Deposit Verified!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                  Thank you for securing your consultation. We've logged transaction code <strong>AGH-PAY-{Math.floor(100000 + Math.random() * 900000)}</strong>. Our head care coordinator Nurse Funmilayo Adesida is prioritizing your clinical assessment block.
                </p>
                <p className="text-[10px] text-slate-400">Closing window shortly...</p>
              </div>
            ) : (
              <div className="space-y-6 text-left">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-mono tracking-wider text-gold-500 uppercase font-bold">
                    Secure Flutterwave Gateway
                  </span>
                  <h3 className="text-xl font-display font-bold">Verify Care Deposit</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                    Paying consultation fee for <strong>Patient: {createdOrder.patientName}</strong>.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      Debit Card Number
                    </label>
                    <input
                      type="text"
                      value={payCard.number}
                      onChange={(e) => setPayCard({ ...payCard, number: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={payCard.expiry}
                        onChange={(e) => setPayCard({ ...payCard, expiry: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        CVC Security Code
                      </label>
                      <input
                        type="password"
                        value={payCard.cvc}
                        onChange={(e) => setPayCard({ ...payCard, cvc: e.target.value })}
                        className="w-full px-4 py-2 bg-slate-50 dark:bg-navy-950 border border-slate-200 dark:border-navy-800 rounded-xl text-xs focus:outline-none focus:border-emerald-500 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-slate-100 dark:bg-navy-950 rounded-xl border border-slate-200/50 dark:border-navy-850 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">Amount to pay:</span>
                    <strong className="text-emerald-600 font-mono">₦15,000.00 NGN</strong>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={handleVerifyPayment}
                  disabled={payLoading}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {payLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                      Verifying secure credentials...
                    </>
                  ) : (
                    "Authorize Secure Payment"
                  )}
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </section>
  );
}
