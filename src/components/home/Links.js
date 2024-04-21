import { Link } from "react-router-dom";

function Links() {
  return (
    <div>
      <div>
        <Link to='/pops'>Grafik</Link>
      </div>
      <div>
        <Link to='/finance'>Wydatki</Link>
      </div>
    </div>
  );
}

export default Links;
