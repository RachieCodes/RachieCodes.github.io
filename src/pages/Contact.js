import { useForm, ValidationError } from '@formspree/react';
import "../css/Contact.css";

const Contact = () => {
  const [state, handleSubmit] = useForm("manjrwyl");

  return (
    <div className="pipboy-main contact-main">
      <div className="contact-terminal">
        <div className="crt-scanlines"></div>
        <p>
          Have a question, funny meme, or just want to say hello?  
          <br />
          Send a transmission below or <a href="mailto:RachieCodes@outlook.com">email me directly</a>.
        </p>
        {state.succeeded ? (
          <div className="pipboy-success">
            <span className="pipboy-mail-icon big">
              <svg width="64" height="64" viewBox="0 0 48 48">
                <rect x="4" y="12" width="40" height="24" rx="4" fill="none" stroke="#ffd52c" strokeWidth="3"/>
                <polyline points="4,12 24,30 44,12" fill="none" stroke="#ffd52c" strokeWidth="3"/>
              </svg>
            </span>
            <h2>Transmission Sent!</h2>
            <p>Your message has been sent! Thank you for reaching out.</p>
          </div>
        ) : (
          <form className="pipboy-contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input type="text" name="name" required autoComplete="off" />
              <ValidationError prefix="Name" field="name" errors={state.errors} />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" required autoComplete="off" />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" rows={4} required />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
            </label>
            <button type="submit" className="pipboy-btn" disabled={state.submitting}>
              <span className="pipboy-btn-glow"></span>
              <span>Send Transmission</span>
            </button>
            <ValidationError errors={state.errors} />
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;