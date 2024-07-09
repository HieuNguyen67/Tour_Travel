
import { useAuth } from "@/context";
import cancelimg from "@/assets/image/cancle.png";
import React, { Suspense, lazy } from "react";
const CancellationRequests = lazy(() =>
  import("@/components/list-request-cancellation")
);

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
        <Suspense fallback={<div>Loading...</div>}>
          <CancellationRequests businessId={businessId} />
        </Suspense>
        
      </>
    );
}
export default ListRequestCancleBusiness;