import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import {
  BORDER,
  RED_COLOR,
} from "@/constants";
import axios from "axios";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import searchimg from "@/assets/image/search.png";
import "@/page/customer/Home/Home.scss";
import "./tab-search.scss";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

const TabSearch = () => {
  const [destinationLocation, setDestinationLocation] = useState("");
  const [departurenLocation, setDepartureLocation] = useState("");
  const [tourName, setTourName] = useState("");
  const [loading, setLoading] = useState(true);
  const [regions, setRegions] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/locations?location_type=nội địa`
        );
        setProvinces(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching provinces: " + error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL_USER}/locations?location_type=nước ngoài`
        );
        setRegions(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching provinces: " + error.message);
        setLoading(false);
      }
    };

    fetchRegions();
  }, []);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/list-tour-vietnam/1?destinationLocation=${destinationLocation}&departureLocation=${departurenLocation}`
    );
  };
  const handleSearch1 = () => {
    navigate(`/list-tour-vietnam/1?tourName=${tourName}`);
  };
  const handleSearch3 = () => {
    navigate(
      `/list-tour-foreign/2?destinationLocation=${destinationLocation}&departureLocation=${departurenLocation}`
    );
  };
  const handleSearch4 = () => {
    navigate(`/list-tour-foreign/2?tourName=${tourName}`);
  };
  return (
    <>
      {" "}
      <div
        className="my-4 rounded-5 shadow p-2"
        style={{
          background: "white",
          border: "3px solid var(--gray-600, #475467)",
        }}
      >
        <Container className="my-4">
          <h2 className=" fw-bold">
            <img src={searchimg} className="mb-2 location" loading="lazy" /> Tìm
            kiếm Tour :
          </h2>
          <hr />
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col className="col-12">
                <Nav variant="pills" className="flex-row">
                  <Nav.Item
                    className="mx-lg-2 rounded-3 shadow-sm col-lg-2 col-12 mb-2 mb-lg-0 "
                    style={{
                      border: BORDER,
                      background: "white",
                    }}
                  >
                    <Nav.Link
                      eventKey="first"
                      className="text-center py-2 fw-bold "
                    >
                      Du lịch trong nước
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item
                    className="mx-lg-2 rounded-3 shadow-sm col-lg-2 col-12 "
                    style={{
                      border: BORDER,
                      background: "white",
                    }}
                  >
                    <Nav.Link
                      eventKey="second"
                      className="text-center py-2  fw-bold"
                    >
                      Du lịch nước ngoài
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className="col-12 mt-4 mb-4">
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {" "}
                    <Tabs
                      defaultActiveKey="home"
                      id="justify-tab-example"
                      className="mb-3"
                      justify
                    >
                      <Tab eventKey="home" title="Tìm điểm đến">
                        <div className="p-lg-2">
                          <h4 className="mb-4 mt-2">
                            <MdLocationOn className="fs-4 text-danger fw-bold" />{" "}
                            Bạn muốn đi đến đâu (Tour trong nước) :
                          </h4>
                          <form onSubmit={handleSearch}>
                            <Row>
                              <Col className="col-lg-11 col-12 mb-3 mb-lg-0">
                                <Row className="">
                                  <Col>
                                    {" "}
                                    <FormControl
                                      fullWidth
                                      className="shadow rounded"
                                      color="warning"
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Nơi khởi hành
                                      </InputLabel>
                                      <Select
                                        defaultValue=""
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Nơi khởi hành"
                                        sx={{
                                          background: "white",
                                        }}
                                        value={departurenLocation}
                                        onChange={(e) =>
                                          setDepartureLocation(e.target.value)
                                        }
                                        required
                                      >
                                        {provinces.map((province) => (
                                          <MenuItem
                                            key={province.location_id}
                                            value={province.location_id}
                                          >
                                            {province.location_name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Col>
                                  <Col className="col-lg-1 col-12">
                                    <div
                                      style={{
                                        display: "grid",
                                        placeItems: "center",
                                      }}
                                      className="my-3 my-lg-2"
                                    >
                                      <FaArrowRightArrowLeft className="fs-2" />
                                    </div>
                                  </Col>
                                  <Col>
                                    <FormControl
                                      fullWidth
                                      className="shadow rounded"
                                      color="warning"
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Hãy chọn điểm đến
                                      </InputLabel>
                                      <Select
                                        defaultValue=""
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label=" Hãy chọn điểm đến"
                                        sx={{
                                          background: "white",
                                        }}
                                        value={destinationLocation}
                                        onChange={(e) =>
                                          setDestinationLocation(e.target.value)
                                        }
                                        required
                                      >
                                        {provinces.map((province) => (
                                          <MenuItem
                                            key={province.location_id}
                                            value={province.location_id}
                                          >
                                            {province.location_name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Col>
                                </Row>
                              </Col>
                              <Col className="col-lg-1 col-12">
                                <Button
                                  style={{
                                    background: RED_COLOR,
                                    border: "0px",
                                  }}
                                  type="submit"
                                  className="col-12 shadow-sm py-lg-3 py-2 text-light"
                                >
                                  <FaSearch className="fs-4" />
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </Tab>
                      <Tab eventKey="word" title="Tìm theo từ khoá">
                        <div className="p-lg-2 ">
                          <h4 className="mb-4 mt-2">
                            <FaSearch className="fs-5 fw-bold" /> Tìm theo từ
                            khoá (Tour trong nước) :
                          </h4>
                          <form onSubmit={handleSearch1}>
                            <Row>
                              <Col className="col-lg-11 col-12 mb-3 mb-lg-0">
                                <Form.Control
                                  className="py-3 shadow-sm"
                                  type="text"
                                  value={tourName}
                                  onChange={(e) => setTourName(e.target.value)}
                                  placeholder="Tìm kiếm tour..."
                                  style={{ border: "3px solid #ffc107" }}
                                  required
                                />
                              </Col>
                              <Col className="col-lg-1 col-12">
                                <Button
                                  style={{
                                    background: RED_COLOR,
                                    border: "0px",
                                  }}
                                  type="submit"
                                  className="col-12 shadow-sm py-lg-3 py-2 text-light"
                                >
                                  <FaSearch className="fs-4" />
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </Tab>
                    </Tabs>
                  </Tab.Pane>
                </Tab.Content>
                <Tab.Content>
                  <Tab.Pane eventKey="second">
                    {" "}
                    <Tabs
                      defaultActiveKey="home"
                      id="justify-tab-example"
                      className="mb-3"
                      justify
                      style={{ background: "white" }}
                    >
                      <Tab eventKey="home" title="Tìm điểm đến">
                        <div className="p-lg-2">
                          <h4 className="mb-4 mt-2">
                            <MdLocationOn className="fs-4 text-danger fw-bold" />{" "}
                            Bạn muốn đi đến đâu (Tour nước ngoài) :
                          </h4>
                          <form onSubmit={handleSearch3}>
                            <Row>
                              <Col className="col-lg-11 col-12 mb-3 mb-lg-0">
                                <Row>
                                  <Col>
                                    {" "}
                                    <FormControl
                                      fullWidth
                                      className="shadow rounded"
                                      color="warning"
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Nơi khởi hành
                                      </InputLabel>
                                      <Select
                                        defaultValue=""
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Nơi khởi hành"
                                        sx={{
                                          background: "white",
                                        }}
                                        value={departurenLocation}
                                        onChange={(e) =>
                                          setDepartureLocation(e.target.value)
                                        }
                                        required
                                      >
                                        {provinces.map((province) => (
                                          <MenuItem
                                            key={province.location_id}
                                            value={province.location_id}
                                          >
                                            {province.location_name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Col>
                                  <Col className="col-lg-1 col-12">
                                    <div
                                      style={{
                                        display: "grid",
                                        placeItems: "center",
                                      }}
                                      className="my-3 my-lg-2"
                                    >
                                      <FaArrowRightArrowLeft className="fs-2" />
                                    </div>
                                  </Col>
                                  <Col>
                                    {" "}
                                    <FormControl
                                      fullWidth
                                      className="shadow rounded"
                                      color="warning"
                                    >
                                      <InputLabel id="demo-simple-select-label">
                                        Hãy chọn điểm đến
                                      </InputLabel>
                                      <Select
                                        defaultValue=""
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Hãy chọn điểm đến"
                                        sx={{
                                          background: "white",
                                        }}
                                        value={destinationLocation}
                                        onChange={(e) =>
                                          setDestinationLocation(e.target.value)
                                        }
                                        required
                                      >
                                        {regions.map((region) => (
                                          <MenuItem
                                            key={region.location_id}
                                            value={region.location_id}
                                          >
                                            {region.location_name}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Col>
                                </Row>
                              </Col>
                              <Col className="col-lg-1 col-12">
                                <Button
                                  style={{
                                    background: RED_COLOR,
                                    border: "0px",
                                  }}
                                  type="submit"
                                  className="col-12 shadow-sm py-lg-3 py-2 text-light"
                                >
                                  <FaSearch className="fs-4" />
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </Tab>
                      <Tab eventKey="word" title="Tìm theo từ khoá">
                        <div className="p-lg-2 ">
                          <h4 className="mb-4 mt-2">
                            <FaSearch className="fs-5 fw-bold" /> Tìm theo từ
                            khoá (Tour nước ngoài) :
                          </h4>
                          <form onSubmit={handleSearch4}>
                            <Row>
                              <Col className="col-lg-11 col-12 mb-3 mb-lg-0">
                                <Form.Control
                                  className="py-3 shadow-sm"
                                  type="text"
                                  value={tourName}
                                  onChange={(e) => setTourName(e.target.value)}
                                  placeholder="Tìm kiếm tour..."
                                  style={{ border: "3px solid #ffc107" }}
                                  required
                                />
                              </Col>
                              <Col className="col-lg-1 col-12">
                                <Button
                                  style={{
                                    background: RED_COLOR,
                                    border: "0px",
                                  }}
                                  type="submit"
                                  className="col-12 shadow-sm py-lg-3 py-2 text-light"
                                >
                                  <FaSearch className="fs-4" />
                                </Button>
                              </Col>
                            </Row>
                          </form>
                        </div>
                      </Tab>
                    </Tabs>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  );
};
export default TabSearch;
