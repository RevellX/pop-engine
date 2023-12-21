import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

function GuidePage() {
  const loaderData = useLoaderData();

  return (
    <Suspense fallback={<h1>Loading guides...</h1>}>
      <Await
        resolve={loaderData.guides}
        errorElement={<h1>CRITICAL ERROR !@#!@#!@#</h1>}
      >
        {(guides) => <div>Loaded {console.log(guides)}</div>}
      </Await>
    </Suspense>
  );
}

export async function loader() {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { name: "Betty" },
        { name: "Mario" },
        { name: "Ben" },
      ]);
    }, 1000);
  });

  return defer({
    guides: promise,
  });
}

export default GuidePage;
