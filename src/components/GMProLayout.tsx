import Head from "next/head";

type Props = {
  children: React.ReactNode;
};

const GMProLayout = ({ children }: Props) => {
  // Styles that ensure no horizontal scrolling and responsive design
  const containerStyle: React.CSSProperties = {
    backgroundColor: "#202124",
    color: "#e8eaed",
    minHeight: "100vh",
    maxWidth: "100%",
    padding: "12px",
    fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
    overflowX: "hidden",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    <div>
      <Head>
        <title>GM Pro - Meeting Settings</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="GM Pro meeting enhancement settings"
        />
      </Head>
      <div style={containerStyle}>
        {/* Header with logo and status */}
        <header style={{ textAlign: "center", marginBottom: "12px" }}>
          <img
            src="https://lh3.googleusercontent.com/oEMr1ptQCg81T6dBLdb53OfI73whvbqyCvlZ7mt1UAFbRwFchkB29Cn2x_5KdpZURYDuulqGanQu3EfD3Tjmrd0f=s120"
            alt="GM Pro"
            width={48}
            height={48}
            style={{ borderRadius: "8px", justifySelf: "center" }}
          />
          <h1
            style={{ fontSize: "16px", margin: "8px 0 4px", fontWeight: 500 }}
          >
            GM Pro
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "#5f6368",
              margin: 0,
            }}
          >
            For Google Meet™
          </p>
        </header>
        {children}
        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            fontSize: "11px",
            color: "#5f6368",
            paddingTop: "8px",
            borderTop: `1px solid #444444`,
          }}
        >
          <p style={{ margin: "4px 0" }}>
            Need help?{" "}
            <a
              href="https://www.gm-pro.online/support"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a73e8", textDecoration: "none" }}
            >
              Contact Support
            </a>
          </p>
          <p style={{ margin: "4px 0" }}>
            <a
              href="https://www.gm-pro.online/privacy"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#5f6368",
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </a>
            {" • "}
            <a
              href="https://www.gm-pro.online/terms"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#5f6368",
                textDecoration: "none",
              }}
            >
              Terms of Service
            </a>
          </p>
          <p style={{ margin: "4px 0", fontSize: "10px" }}>
            Google Meet™ is a trademark of Google LLC
          </p>
        </footer>
      </div>
      <style jsx global>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        html,
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        /* Ensure no horizontal scroll */
        body {
          max-width: 100vw;
          overflow-x: hidden;
        }
        /* Google-style focus ring */
        button:focus-visible,
        select:focus-visible,
        input:focus-visible {
          outline: 2px solid #1a73e8;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default GMProLayout;
