import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Profile() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  
  return (
    <div>
      <form
        onSubmit={function (eventInfo) {
          router.push(`/${username}`);
          eventInfo.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="insira seu username"
          onChange={(eventInfo) => {
            setUsername(eventInfo.target.value);
          }}
        />
        <button type="submit" disabled={username.length === 0}>
          login
        </button>
      </form>
    </div>
  )
}