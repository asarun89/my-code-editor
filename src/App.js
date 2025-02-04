import React, { useState, useRef, useEffect } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setScore(null);

    // Simulate an API call to your LLM endpoint that validates the code and returns a score.
    // Replace this simulation with an actual fetch/axios call as needed.
    setTimeout(() => {
      // For demo purposes, we compute a score based on the length of the code.
      // This can be replaced by your own validation logic.
      const computedScore = Math.min(100, Math.floor(code.length / 10));
      setScore(computedScore);
      setLoading(false);
    }, 1500);
  };

  // Whenever the score changes, update the canvas drawing.
  useEffect(() => {
    if (score !== null && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const padding = 10;
      const barHeight = canvas.height - 2 * padding;
      const maxBarWidth = canvas.width - 2 * padding;
      const barWidth = maxBarWidth * (score / 100);

      // Draw the score bar
      ctx.fillStyle = '#007bff';
      ctx.fillRect(padding, padding, barWidth, barHeight);

      // Draw a border around the bar area
      ctx.strokeStyle = '#333';
      ctx.strokeRect(padding, padding, maxBarWidth, barHeight);

      // Draw the score text
      ctx.fillStyle = '#000';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, padding + 5, padding + 25);
    }
  }, [score]);

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Code Editor Canvas</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          style={{
            width: '100%',
            height: '200px',
            fontFamily: 'monospace',
            fontSize: '14px',
            padding: '10px',
          }}
          placeholder="Type your code here..."
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="submit" disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? 'Submitting...' : 'Submit Code'}
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <canvas
          ref={canvasRef}
          width={400}
          height={100}
          style={{ border: '1px solid #ccc' }}
        />
      </div>
      {score !== null && (
        <div style={{ marginTop: '20px' }}>
          <h2>Score: {score}</h2>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
