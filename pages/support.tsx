import { useState, FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import emailjs from "@emailjs/browser";

// EmailJS configuration - set up your template at emailjs.com
const EMAILJS_SERVICE_ID = "service_oc8qznf";
const EMAILJS_TEMPLATE_ID = "template_oc0q9be";
const EMAILJS_PUBLIC_KEY = "user_HDJ1SCLZ6I6ByO7Ey8D36";

export default function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setStatus("error");
      setErrorMessage("Please fill in all required fields");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          rnName: formData.name,
          rnEmail: formData.email,
          rnSubject: formData.subject,
          rnMessage: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
      console.error("EmailJS error:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Support - GM Pro</title>
        <meta
          name="description"
          content="Get help with GM Pro Chrome Extension"
        />
      </Head>

      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a0a0a",
          color: "#ffffff",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          padding: "40px 20px",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <Link href="/">
              <img
                src="https://lh3.googleusercontent.com/oEMr1ptQCg81T6dBLdb53OfI73whvbqyCvlZ7mt1UAFbRwFchkB29Cn2x_5KdpZURYDuulqGanQu3EfD3Tjmrd0f=s120"
                alt="GM Pro Logo"
                width={70}
                height={70}
                style={{
                  borderRadius: "14px",
                  marginBottom: "16px",
                  cursor: "pointer",
                }}
              />
            </Link>
            <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Support</h1>
            <p style={{ color: "#888", fontSize: "16px" }}>
              Need help? Send us a message and we&apos;ll get back to you.
            </p>
          </div>

          {status === "success" ? (
            <div
              style={{
                backgroundColor: "#1a2a1a",
                border: "1px solid #2a4a2a",
                borderRadius: "12px",
                padding: "30px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
              <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>
                Message Sent!
              </h2>
              <p style={{ color: "#888", marginBottom: "20px" }}>
                Thank you for reaching out. We&apos;ll respond to your email
                shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  cursor: "pointer",
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="name"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#aaa",
                    fontSize: "14px",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  placeholder="Your name"
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="email"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#aaa",
                    fontSize: "14px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label
                  htmlFor="subject"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#aaa",
                    fontSize: "14px",
                  }}
                >
                  Subject
                </label>
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: formData.subject ? "#fff" : "#666",
                    fontSize: "16px",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Account Issue">Account Issue</option>
                  <option value="General Question">General Question</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <label
                  htmlFor="message"
                  style={{
                    display: "block",
                    marginBottom: "8px",
                    color: "#aaa",
                    fontSize: "14px",
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    backgroundColor: "#1a1a1a",
                    border: "1px solid #333",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "16px",
                    outline: "none",
                    resize: "vertical",
                    minHeight: "120px",
                  }}
                  placeholder="Describe your issue or question..."
                />
              </div>

              {status === "error" && (
                <div
                  style={{
                    backgroundColor: "#2a1a1a",
                    border: "1px solid #4a2a2a",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    marginBottom: "20px",
                    color: "#ff6b6b",
                    fontSize: "14px",
                  }}
                >
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  backgroundColor: status === "loading" ? "#555" : "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: 500,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  transition: "background-color 0.2s",
                }}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}

          {/* Footer Links */}
          <div
            style={{
              marginTop: "40px",
              paddingTop: "20px",
              borderTop: "1px solid #222",
              textAlign: "center",
              fontSize: "14px",
              color: "#666",
            }}
          >
            <Link
              href="/"
              style={{
                color: "#888",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              Home
            </Link>
            <Link
              href="/privacy"
              style={{
                color: "#888",
                textDecoration: "none",
                marginRight: "20px",
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{ color: "#888", textDecoration: "none" }}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        input:focus,
        select:focus,
        textarea:focus {
          border-color: #1976d2 !important;
        }
        button:hover:not(:disabled) {
          background-color: #1565c0 !important;
        }
      `}</style>
    </>
  );
}
