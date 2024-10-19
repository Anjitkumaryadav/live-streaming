import React, { useState } from 'react';
import { useNavigate } from 'react-router';

function Home() {
  const [roomId, setRoomID] = useState('');
  const [joinLink, setJoinLink] = useState('');
  const navigate = useNavigate();


  const createRoom = () => {
    const generatedRoomID = Math.random().toString(36).substring(2, 8);
    setRoomID(generatedRoomID);
    const link = `${window.location.protocol}//${window.location.host}/room/${generatedRoomID}`;
    navigator.clipboard.writeText(link);
    alert(`Room created! Link copied to clipboard: ${link}`);
    navigate(`/room/${generatedRoomID}`);
  };


  const joinRoom = () => {
    if (joinLink.includes('room')) {
      const extractedRoomID = joinLink.split('/room/')[1];
      navigate(`/room/${extractedRoomID}`);
    } else {
      alert('Invalid room link.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Watch Movies with Friends</h1>

      
      <div className="mb-8">
        <button
          onClick={createRoom}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-500 transition"
        >
          Create Room and Copy Link
        </button>
      </div>

      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Paste the room link here"
          value={joinLink}
          onChange={(e) => setJoinLink(e.target.value)}
          className="bg-gray-800 text-white py-2 px-4 rounded mb-4 w-full max-w-md"
        />
        <button
          onClick={joinRoom}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

export default Home;
