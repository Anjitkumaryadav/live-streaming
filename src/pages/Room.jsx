import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Room() {
  const { roomId } = useParams();
  const videoRef = useRef(null);

  function randomID(len) {
    let result = '';
    var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP';
    len = len || 5;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  const myMeeting = async (element) => {
    const appID = Number(import.meta.env.VITE_APP_ID);
    const serverSecret = String(import.meta.env.VITE_SERVER_SECRET)
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      randomID(5),
      randomID(5)
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}/room/${roomId}`,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  useEffect(() => {
    myMeeting(videoRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6">Room ID: {roomId}</h2>
      <div ref={videoRef} className="w-full h-full bg-gray-800 rounded-lg shadow-lg"></div>
    </div>
  );
}

export default Room;
