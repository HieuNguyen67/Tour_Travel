import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./side-bar.scss";
import { ACCOUNTMANAGEMENT, ADMIN, BUSINESS, NEWSMANAGEMENT, SUPPORTMANAGEMENT } from "@/constants";
import { useAuth } from "@/context";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Button,
} from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { FcBusinessman } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { MdExpandMore, MdMenu } from "react-icons/md";
import menuimg from "@/assets/image/menu.png";
import adminimg from "@/assets/image/admin.png";
import businessimg from "@/assets/image/business1.png";

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
              {role == 2 || role == 4 || role == 5 || role == 6 ? (
                <div className="text-dark fw-bold fs-3">
                  <img
                    src={adminimg}
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      objectFit: "cover",
                    }}
                    loading="lazy"
                  />{" "}
                  ADMIN
                </div>
              ) : role == 3 ? (
                <div className="text-dark fw-bold fs-5">
                  <span style={{ display: "grid", placeItems: "center" }}>
                    <img
                      src={businessimg}
                      style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        objectFit: "cover",
                      }}
                      loading="lazy"
                    />
                  </span>{" "}
                  DOANH NGHIỆP
                </div>
              ) : (
                <></>
              )}
            </ListItem>
            {role == 2 && renderNavItems(ADMIN)}
            {role == 3 && renderNavItems(BUSINESS)}
            {role == 4 && renderNavItems(ACCOUNTMANAGEMENT)}
            {role == 5 && renderNavItems(NEWSMANAGEMENT)}
            {role == 6 && renderNavItems(SUPPORTMANAGEMENT)}
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
              <img
                src={menuimg}
                className="ms-2"
                style={{ width: "3rem", height: "3rem" }}
                loading="lazy"
              />
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
                  {role == 4 && renderNavItems(ACCOUNTMANAGEMENT)}
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
