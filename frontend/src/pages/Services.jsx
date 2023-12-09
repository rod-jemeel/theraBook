import { useCallback } from 'react';
import Talk from 'talkjs';
import { Session, Chatbox } from '@talkjs/react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const { state } = useContext(AuthContext);
const { user } = state;

function ChatComponent() {
  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: user.id,
        name: user.name,
        email: user.email,
        photoUrl: user.photo,
        welcomeMessage: 'Hi!',
        role: user.role,
      }),
    [user]
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation('welcome');

    const other = new Talk.User({
      id: 'frank',
      name: 'Frank',
      email: 'frank@example.com',
      photoUrl: 'https://talkjs.com/new-web/avatar-8.jpg',
      welcomeMessage: 'Hey, how can I help?',
      role: 'default',
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  return (
    <Session appId="<APP_ID>" syncUser={syncUser}>
      <Chatbox
        syncConversation={syncConversation}
        style={{ width: '100%', height: '500px' }}
      ></Chatbox>
    </Session>
  );
}

export default ChatComponent;