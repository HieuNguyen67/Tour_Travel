import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./side-bar.scss";
import { ADMIN, BUSINESS } from "@/constants";
import { useAuth } from "@/context";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Drawer,
  IconButton,
  Button,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { FcBusinessman } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { MdExpandMore, MdMenu } from "react-icons/md";
import menuimg from "@/assets/image/menu.png";

const SidebarLayout = ({ children }) => {
  const { role } = useAuth();
  const location = useLocation();

  const [expanded, setExpanded] = useState({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleExpand = (itemId) => {
    setExpanded((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderNavItems = (items) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <ListItem
          button
          component={NavLink}
          to={item.link}
          style={{
            backgroundColor:
              location.pathname === item.link
                ? "hsl(210, 100%, 96%)"
                : "transparent",
            color: location.pathname === item.link ? "hsl(210, 100%, 42%)" : "",
          }}
        >
          <span className="me-3 fs-5">{item.icon}</span>
          <ListItemText primary={item.name} />
          {item.name2 && item.link2 && (
            <MdExpandMore
              onClick={() => handleExpand(item.id)}
              style={{
                transform: expanded[item.id]
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
              }}
            />
          )}
        </ListItem>
        {item.name2 && item.link2 && (
          <Collapse
            in={expanded[item.id] || location.pathname.includes(item.link2)}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <ListItem
                button
                component={NavLink}
                to={item.link2}
                style={{
                  paddingLeft: 32,
                  backgroundColor:
                    location.pathname === item.link2
                      ? "hsl(210, 100%, 96%)"
                      : "transparent",
                  color:
                    location.pathname === item.link2
                      ? "hsl(210, 100%, 42%)"
                      : "",
                }}
              >
                <span className="me-2 fs-5">{item.icon2}</span>{" "}
                <ListItemText primary={item.name2} />
              </ListItem>
            </List>
          </Collapse>
        )}
      </React.Fragment>
    ));
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Row>
        <Col className="col-lg-2 col-12 d-lg-block d-none sidebarrr">
          <List>
            <ListItem className="mb-3">
              {role == 2 ? (
                <div className="text-dark fw-bold fs-3">
                  <FcManager className="fs-1" /> ADMIN
                </div>
              ) : role == 3 ? (
                <div className="text-dark fw-bold fs-3">
                  <FcBusinessman className="fs-1" /> DOANH NGHIỆP
                </div>
              ) : (
                <></>
              )}
            </ListItem>
            {role == 2 && renderNavItems(ADMIN)}
            {role == 3 && renderNavItems(BUSINESS)}
          </List>
        </Col>
        <Col className="col-lg-10 col-12 my-lg-5 pt-lg-5">
          <div className="col-12 d-lg-none d-block pt-5 mb-3">
            <Button
              color="inherit"
              aria-label="open drawer"
              edge="start"
              className="mt-2"
              onClick={toggleDrawer}
            >
              <img src={menuimg} className="ms-2" style={{width:'3rem',height:"3rem"}}/>
            </Button>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
              <div style={{ width: "250px" }}>
                <List>
                  <ListItem className="mb-3">
                    {role == 2 ? (
                      <div className="text-dark fw-bold fs-3">
                        <FcManager className="fs-1" /> ADMIN
                      </div>
                    ) : role == 3 ? (
                      <div className="text-dark fw-bold fs-3">
                        <FcBusinessman className="fs-1" /> DOANH NGHIỆP
                      </div>
                    ) : (
                      <></>
                    )}
                  </ListItem>
                  {role == 2 && renderNavItems(ADMIN)}
                  {role == 3 && renderNavItems(BUSINESS)}
                </List>
              </div>
            </Drawer>
          </div>
          <div className="col-12 px-3 px-lg-3">{children}</div>
        </Col>
      </Row>
    </div>
  );
};

export default SidebarLayout;
