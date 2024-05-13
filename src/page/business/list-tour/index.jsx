import { Container,Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BLUE_COLOR } from "../../../constants/color";
import { MdDeleteForever } from "react-icons/md";
import { MdTour } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const ListTour=()=>{
    return (
      <>
        <p className="text-end">
          <Button
            variant="danger"
            // onClick={handleDeleteSelected}
            className="me-2"
          >
            <MdDeleteForever className="fs-4" />
          </Button>

          <Link to="/business/add-tour" className="text-decoration-none">
            {" "}
            <Button style={{ background: BLUE_COLOR, border: "0px" }}>
              <IoMdAdd/><MdTour className="fs-3" />
            </Button>
          </Link>
        </p>
      </>
    );
}
export default ListTour;