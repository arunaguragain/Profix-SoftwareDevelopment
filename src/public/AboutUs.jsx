const AboutUs = () => {
    return (
      <div>
        <style>
          {`
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
  
            body {
                font-family: 'Times New Roman', Times, serif;
                line-height: 1.6;
                color: #333;
                background-color: #f9f9f9;
            }
  
            header {
                background-color: #0a2c61;
                color: white;
                padding: 1rem 0;
                text-align: center;
            }
  
            header h1 {
                margin: 0;
                font-size: 2.5rem;
            }
  
            .breadcrumb {
                background-color: #ecf0f1;
                padding: 10px 15px;
                text-align: center;
                font-size: 0.9rem;
            }
  
            .breadcrumb a {
                color: #5b5e63;
                text-decoration: none;
            }
  
            .about-section {
                background-color: #5b5e63;
                color: white;
                padding: 2rem;
                text-align: center;
            }
  
            .about-section h2 {
                font-size: 2rem;
            }
  
            .about-section p {
                margin: 1rem 0;
                font-size: 1.1rem;
            }
  
            footer {
                background-color: #0a2c61;
                color: white;
                text-align: center;
                padding: 1rem 0;
                margin-top: 2rem;
            }
          `}
        </style>
        
        <header>
          <h1>About Us</h1>
        </header>
  
        <div className="breadcrumb">
          <a href="#">Home</a>
        </div>
  
        <section className="about-section">
          <p>
            Profix is your trusted platform for booking home repair services such
            as carpentry, plumbing, and electrical work. We are dedicated to
            connecting local service providers with customers who need reliable
            and efficient solutions for their home repair needs.
          </p>
          <p>
            Our mission is to empower local service providers by offering them a
            platform to showcase their skills and connect with a broader audience.
            At the same time, we aim to make it easier for homeowners to access
            professional repair services at their convenience.
          </p>
          <p>
            At Profix, we believe in supporting local talent and building a
            community of trusted service professionals. Your home repair solutions
            are just a click away!
          </p>
        </section>
  
        <footer>
          <p>&copy; 2025 Profix. All rights reserved.</p>
        </footer>
      </div>
    );
  };
  
  export default AboutUs;
  