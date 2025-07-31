import { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { FiAlertCircle } from "react-icons/fi";
import axios from 'axios';

function HomePage() {
    const [entry, setEntry] = useState('');
    const [reflection, setReflection] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const location = useLocation();
    const [tone, setTone] = useState("compassionate");

    const resetEntry = () => {
        console.log('Resetting journal entry and reflection');
        setEntry('');
        setReflection('');

        const cleanURL = location.pathname;
        window.history.replaceState(null, '', cleanURL);
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const reset = queryParams.get('reset') === 'true';

        if (reset) {
            resetEntry();
        }
    }, [location.key]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setReflection('');

        try {
            const res = await fetch('http://localhost:3000/api/journal/reflection', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ entry, tone })

            });

            const data = await res.json();
            setReflection(data.reflection || 'No reflection generated.');
        } catch (error) {
            console.error('Error generating reflection:', error);
            setReflection('An error occurred while generating the reflection.');
        }
        setIsLoading(false);
    };

    const handleSave = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/entries/save', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ entry, reflection })
            });
            if (!res.ok) {
                alert('Failed to save journal entry.');
            } else {
                alert('Journal entry and reflection saved successfully!');
            }
            await axios.post('http://localhost:3000/api/entries', { entry, reflection });
            navigate('/home');
        } catch (error) {
            console.error('Error saving journal entry:', error);
            alert('An error occurred while saving the journal entry.'); 
        }
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this entry? This action cannot be undone.");
        if (confirmDelete) {
            resetEntry();
        }
    };

    return (
        <div className='home-page'>
            <h1>Journal Space</h1>              
            {!reflection && ( 
                <div className='form-section'>
                    <form onSubmit={handleSubmit} className='journal-form'>

                        <label>Select Reflection Tone:</label>
                        <select id="tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                            <option value="compassionate">Compassionate</option>
                            <option value="motivational">Motivational</option>
                            <option value="philosophical">Philosophical</option>
                            <option value="humorous">Humorous</option>
                        </select>

                        <textarea
                            value={entry}
                            onChange={(e) => setEntry(e.target.value)}
                            placeholder='Write your journal entry here and I will reflect on it in your chosen tone...'
                            required
                        />

                        <button type='submit' disabled={isLoading}>
                            {isLoading ? 'Reflecting...' : 'Submit Entry'}
                        </button>
                    </form>

                    <div className='info-section'>
                        <FiAlertCircle 
                            className='info-icon' 
                            onClick={() => setShowInfo(!showInfo)}
                            title='What is this?'
                        />

                        {showInfo && (
                            <div className="info-box">
                                <p>Take a moment to pause. This space is yours, there is no right or wrong way to write. You can reflect on your day, explore a specific emotion, or simply let your thoughts flow. Once you are done, I'll reflect back what I notice based on the Reflection Tone you select. No judgment, just understanding.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {reflection && (
                <div className='reflection-container'>

                    <div className='entry'>
                        <h2>Your Entry:</h2>
                        <p>{entry}</p>
                    </div>

                    <div className='reflection'>
                        <h2>Lumina's Reflection:</h2>
                        <ReactMarkdown>{reflection}</ReactMarkdown>
                    </div>

                    <div className='action-buttons'>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleDelete}>Reset</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;