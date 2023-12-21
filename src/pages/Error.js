import { Link, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.log(error);

  return (
    <>
      <h1>An error has accured</h1>
      <p>Please go back to the home page</p>
      <textarea style={{ width: "100%", height: "100vh" }}>
        {error}
      </textarea>
      <Link to={"/"}>Home Page</Link>
      <p>Or see the console for more details</p>
    </>
  );
}

export default ErrorPage;
