import { useAuth } from "@/context";
import { Container } from "react-bootstrap";
import React, { Suspense, lazy } from "react";

const CancellationRequests = lazy(() =>
  import("@/components/list-request-cancellation")
);

const Refunds = () => {
  const { customerId } = useAuth();
  return (
    <>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <CancellationRequests customerId={customerId} />
        </Suspense>
      </Container>
    </>
  );
};
export default Refunds;
