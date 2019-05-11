import React, { useCallback, useState, useEffect } from 'react';

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');
};

export default () => {
  const [subscribed, setSubscribed] = useState(false);
  const [buttonText, setButtonText] = useState('Subscribe');
  const [sent, setSent] = useState(false);

  const onSubmit = useCallback(e => {
    e.preventDefault();
    setButtonText('Sending...');

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'subscribe',
        email: e.target.elements.email.value,
      }),
    }).then(() => {
      setSent(true);
      window.localStorage.setItem('subscribed', 'true');
    });
    window.ga && window.ga.send('send', 'event', 'Subscription', 'subscribe', 'Subscribe');
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem('subscribed')) {
      setSubscribed(true);
    }
  }, []);

  if (subscribed) return null;

  return (
    <div className="subscribe">
      <hr />
      <h4>Want more? </h4>
      <p>
        If you liked this post, consider subscribing to my blog. I will notify
        you via email when I post a new article. I promise never to spam you, or
        to share your email with any third party.
      </p>
      {sent ? (
        <p>Thank you!</p>
      ) : (
        <form
          onSubmit={onSubmit}
          name="subscribe"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
          <p>
            <input
              className="form-control"
              placeholder="Email address"
              type="email"
              name="email"
            />
            <button className="button">{buttonText}</button>
          </p>
        </form>
      )}
    </div>
  );
};
