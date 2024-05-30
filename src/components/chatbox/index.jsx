import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { IoSendSharp } from "react-icons/io5";
import "../BackToTop/BackToTop.scss";
import { IoIosCloseCircle } from "react-icons/io";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { motion } from "framer-motion";
import Modal from "react-bootstrap/Modal";
import bot from "@/assets/image/bot-3.png";
import "./chatbox.scss";
import { AiFillRobot } from "react-icons/ai";

const Chatbox = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: input,
    };

    const modifiedInput = `${input}, trả lời bằng tiếng việt`;

    setMessages([...messages, userMessage]);
    setInput("");
    setLoading(true);

    const options = {
      method: "POST",
      url: "https://models3.p.rapidapi.com/",
      params: {
        model_id: "5",
        prompt: modifiedInput,
      },
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "59cc4e63b3msh4d842910a03af33p1c1163jsn6fe5d033ef64",
        "X-RapidAPI-Host": "models3.p.rapidapi.com",
      },
      data: {
        key1: "value",
        key2: "value",
      },
    };

    try {
      const response = await axios.request(options);
      const botMessage = {
        sender: "bot",
        text: response.data.content,
      };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage = {
        sender: "bot",
        text: "An error occurred while fetching the response.",
      };
      setMessages([...messages, userMessage, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <OverlayTrigger
        placement="left"
        overlay={<Tooltip>Nhấn để được tư vấn.</Tooltip>}
      >
        <div className="me-1 me-lg-0 messenger">
          <motion.div
            animate={{ scale: 0.8 }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <img src={bot} className="bot" onClick={handleShow} />
          </motion.div>
        </div>
      </OverlayTrigger>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <AiFillRobot className="fs-1" />
          <span className="fw-bold fs-5 ms-3">TRỢ LÝ ẢO CỦA BẠN</span>
        </Modal.Header>
        <Modal.Body>
          <div style={styles.chatbox} className="col-12">
            <div style={styles.messagesContainer}>
              <div style={styles.botMessage}>
                👋 Chào quý khách đã đến với Tour Travel. Tôi là trợ lý ảo của
                bạn. Cần tôi giúp gì?
              </div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  style={
                    message.sender === "user"
                      ? styles.userMessage
                      : styles.botMessage
                  }
                >
                  {message.text}
                </div>
              ))}
              {loading && (
                <div style={styles.loadingMessage}>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Đang trả lời...
                </div>
              )}
            </div>
            <form onSubmit={handleSendMessage}>
              <Row className="px-2 pt-2">
                <Col className="col-lg-10 col-9">
                  <Form.Control
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Nhập nội dung..."
                    disabled={loading}
                    className="col-12"
                  />
                </Col>
                <Col className="col-lg-2 col-3">
                  <Button
                    style={{
                      background:
                        "linear-gradient( 93.2deg,  rgba(24,95,246,1) 14.4%, rgba(27,69,166,1) 90.8% )",
                      border: "0px",
                    }}
                    type="submit"
                    className="col-12"
                    disabled={loading}
                  >
                    <IoSendSharp />
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const styles = {
  chatbox: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "600px",
    minHeight: "500px",
    margin: "0 auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    background: "white",
  },
  messagesContainer: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    maxHeight: "400px",
  },
  userMessage: {
    textAlign: "right",
    background: "linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)",
    padding: "10px",
    color: "white",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  botMessage: {
    textAlign: "left",
    background: "#f0f0f0",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  loadingMessage: {
    textAlign: "center",
    padding: "10px",
    marginBottom: "10px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default Chatbox;
