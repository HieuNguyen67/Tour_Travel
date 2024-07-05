import dashboardimg from "@/assets/image/dashboard.png";

const DashboardAdmin = () => {
  return (
    <>
      <h3 className="fw-bold">
        {" "}
        <img
          src={dashboardimg}
          style={{
            width: "4rem",
            height: "4rem",
            objectFit: "cover",
          }}
        />{" "}
        TỔNG QUAN
      </h3>
    </>
  );
};
export default DashboardAdmin;
