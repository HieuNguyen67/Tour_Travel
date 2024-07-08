import CancellationRequests from "@/components/list-request-cancellation";
import { useAuth } from "@/context";
import cancelimg from "@/assets/image/cancle.png";

const ListRequestCancleBusiness = ()=>{
    const{businessId}=useAuth();
    
    return (
      <>
        <h3 className="fw-bold mb-3 sizetextuser">
          <img
            src={cancelimg}
            className="mb-2"
            style={{
              width: "3.5rem",
              height: "3.5rem",
              objectFit: "cover",
            }}
            loading="lazy"
          />{" "}
          YÊU CẦU HUỶ BOOKING
        </h3>
        <CancellationRequests businessId={businessId} />
      </>
    );
}
export default ListRequestCancleBusiness;