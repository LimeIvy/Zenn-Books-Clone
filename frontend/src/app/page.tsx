"use client";

import { client } from "../features/shared/utils/client";

export function Home() {
  const handleClick = async () => {
    const res = await client.books.$get()
    const data = await res.json()
    console.log(data)
  }

  return (
    <div>
      <button onClick={handleClick}>Click!</button>
    </div>
  );
}

export default Home;
