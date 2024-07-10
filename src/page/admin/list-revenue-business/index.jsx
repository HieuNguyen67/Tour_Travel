import revenueimg from "@/assets/image/revenue.png";
import Revenue from "@/components/list-total-revenue-business";

const ListRevenueBusiness = () => {
  return (
    <>
      <h3 className="fw-bold">
        {" "}
        <img
          src={revenueimg}
          style={{
            width: "4rem",
            height: "4rem",
            objectFit: "cover",
          }}
          loading="lazy"
        />{" "}
        DOANH THU DOANH NGHIỆP
      </h3>
      <Revenue/>
    </>
  );
};
export default ListRevenueBusiness;
