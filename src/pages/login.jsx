import { signIn, signOut, useSession } from 'next-auth/client';

export default function login() {
  const [session, loading] = useSession();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!session) {
    return (
      <button onClick={() => signIn('google')}>
        Acceder con Google
      </button>
    );
  }

  return (
    <>
      <p>Hola, {session.user.name}!</p>
      <img src={session.user.image} alt={session.user.name} />
      <button onClick={signOut}>Salir</button>
    </>
  );
}

