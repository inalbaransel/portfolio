import React, { useState, useRef } from "react";
import { sendContactForm } from "../firebase";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const [buttonText, setButtonText] = useState("Send");
  const [animating, setAnimating] = useState(false);
  const buttonRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);
    setError(null);
    setButtonText("Sending...");

    try {
      const result = await sendContactForm(form);

      if (result.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Mesaj gönderilemedi. Lütfen tekrar deneyin.");
        console.error("Firebase Hatası:", result.error);
      }
    } catch (err) {
      setError("Beklenmedik bir hata oluştu.");
      console.error("Submit Catch Hatası:", err);
    } finally {
      setIsSending(false);
      setButtonText("Send");
    }
  };

  const originalText = "Send";
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  function randomString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const handleMouseEnter = () => {
    if (animating || isSending) return;
    setAnimating(true);
    let frame = 0;
    const maxFrames = 12;
    const interval = setInterval(() => {
      if (frame < maxFrames) {
        setButtonText(randomString(originalText.length));
        frame++;
      } else {
        setButtonText(originalText);
        setAnimating(false);
        clearInterval(interval);
      }
    }, 40);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-purple-200">
        <h2 className="text-3xl font-bold text-center text-[#2E54D1] mb-8">
          Contact Form
        </h2>

        {submitted ? (
          <div className="text-center text-green-600 text-xl font-semibold">
            Your message has been sent! Thank you.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-purple-200 bg-white/80 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-purple-200 bg-white/80 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Your email address"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-2 border border-purple-200 bg-white/80 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
                placeholder="Type your message..."
              />
            </div>

            <button
              ref={buttonRef}
              type="submit"
              className={`w-full py-3 text-white font-bold rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 tracking-widest text-lg 
                ${
                  isSending ? "bg-gray-500 cursor-not-allowed" : "bg-[#2E54D1]"
                }`}
              onMouseEnter={handleMouseEnter}
              disabled={animating || isSending}
            >
              {isSending ? "Sending..." : buttonText}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
