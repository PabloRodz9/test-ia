import speakVideo from './assets/SPEAK.MP4';
import muteVideo from './assets/MUTE.MP4';
import { useState } from 'react';
const App = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [message, setMessage] = useState('');

  const playAudio = async () => {
    const apiKey = "sk_fa5f05a04ecc4835a728b6f220fcc2699143b5b3997c156b";
    const text =
      "Welcome to our service. We're here to assist you with any questions you may have. Whether you're looking for support or just curious about our offerings, feel free to ask anytime!";


    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': apiKey,
      },
      body: JSON.stringify({
        text: text,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        }
      })
    };

    setMessage('Cargando audio...');

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/IKne3meq5aSn9XLyUdCD/stream', requestOptions);
      if (!response.ok) throw new Error('Error al obtener el audio');

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      setIsSpeaking(true);

      audio.play();

      audio.onended = () => {
        setIsSpeaking(false);
        setMessage('')
      };

      setMessage('Audio is playing');
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error al reproducir el audio');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100vw', flexDirection: 'column', height: '100vh' }}>
      <video
        id="avatarSpeaking"
        src={speakVideo}
        muted
        loop
        autoPlay
        style={{ display: isSpeaking ? 'block' : 'none', objectFit: 'cover', width: '500px' }}
      />
      <video
        id="avatarStatic"
        src={muteVideo}
        muted
        loop
        autoPlay
        style={{ display: !isSpeaking ? 'block' : 'none', objectFit: 'cover', width: '500px' }}
      />
      <button disabled={isSpeaking} style={{ marginTop: 8 }} onClick={playAudio}>Play Audio</button>
      <p style={{ border: `${message.length > 0 ? '1px solid grey' : ''}`, borderRadius: '8px', padding: '8px', width: 'fit-content' }}>{message}</p>
    </div>
  );
};

export default App;
