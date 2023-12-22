import {
  Await,
  defer,
  useActionData,
  useLoaderData,
} from "react-router-dom";
import {
  POPS_SWAP_URL,
  POPS_URL,
  POP_DELETE_URL,
} from "../utils/config";
import List from "../components/home/List";
import { Suspense } from "react";
import { getAuthToken } from "../utils/token";

const HomePage = () => {
  const loaderData = useLoaderData();
  const actionData = useActionData();

  if (!actionData)
    return (
      <>
        <Suspense fallback={<p>Ładowanie popołudniówek...</p>}>
          <Await
            resolve={loaderData.pops}
            errorElement={
              <p>Wystąpił błąd podczas ładowanie popołudniówek</p>
            }
          >
            {(pops) => {
              return <List pops={pops} />;
            }}
          </Await>
        </Suspense>
      </>
    );
  else return <List pops={actionData.pops} />;
};

async function loadPops() {
  let response = await fetch(POPS_URL);
  if (!response.ok)
    throw new Error({ message: "Error while fetching pops." });

  return await response.json();
}

export async function loader() {
  return defer({ pops: loadPops() });
}

export async function action({ request }) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "swap") {
    const popOne = formData.get("popOne");
    const popTwo = formData.get("popTwo");

    await fetch(POPS_SWAP_URL, {
      method: "PATCH",
      body: JSON.stringify({
        dutyOne: popOne,
        dutyTwo: popTwo,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
    });
    return { pops: await loadPops() };
  } else if (action === "delete") {
    const popId = formData.get("popId");
    await fetch(POP_DELETE_URL, {
      method: "DELETE",
      body: JSON.stringify({
        dutyOne: popId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getAuthToken(),
      },
    });
    return { pops: await loadPops() };
  } else {
    return { pops: await loadPops() };
  }
}

export default HomePage;
