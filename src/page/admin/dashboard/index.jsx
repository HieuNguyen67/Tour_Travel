import dashboardimg from "@/assets/image/dashboard.png";

const DashboardAdmin = () => {
  return (
    <>
      <h3 className="fw-bold">
        {" "}
        <img
          src={dashboardimg}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            objectFit: "cover",
          }}
        />{" "}
        TỔNG QUAN
      </h3>
    </>
  );
};
export default DashboardAdmin;
