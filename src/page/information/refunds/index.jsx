import CancellationRequests from "@/components/list-request-cancellation";
import { useAuth } from "@/context";
import { Container } from "react-bootstrap";

const Refunds=()=>{
  const {customerId}=useAuth();
    return (
      <>
        <Container>
          <CancellationRequests
            customerId={customerId}
          />
        </Container>
      </>
    );
}
export default Refunds;