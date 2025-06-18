import { signOut } from "./login/actions";

export default function Home() {
  return (
    <main>
      <section>
        <p>lulumi</p>

        <button onClick={signOut}>Sign Out</button>
      </section>
    </main>
  );
}
