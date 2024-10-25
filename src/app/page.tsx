import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <h1>Welcome</h1>
      </header>

      <Link className="common-button" href="/login">
        Login
      </Link>
      <Link className="common-button" href="/register">
        Register
      </Link>

      <ul className="pl-4">
        {}
      </ul>
    </>
  );
}
