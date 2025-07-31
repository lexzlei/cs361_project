import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

console.log('LoginPage rendered');
export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    console.log('LoginPage rendered');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/register';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                if (isLogin) {
                    // Redirect to home page after login
                    navigate('/home');
                }
            } else {
                setMessage(data.message || 'An error occurred. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <h1>{isLogin ? 'Login' : 'Register'}</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>Email
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </label>
                <button type="submit">
                    {isLogin ? 'Log In' : 'Register'}
                </button>
            </form>
            <p>{message}</p>
            <p>
                {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Register' : 'Log In'}
                </button>
            </p>
            <article className="app-description">
                <p>
                    A personalized AI companion to help understand yourself with clarity 
                </p>
                <p>
                    Built upon thousands of hours of meditative practice, therapeutic insight, and emotional research
                </p>
            </article>
        </div>
    );
}