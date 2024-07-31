import React, { useEffect, useState, ReactNode } from "react";
import Badge from "@mui/material/Badge";
import axios from "axios";
import { useAuth } from "@/context";

interface PendingBadgeProps {
  endpoint: string;
  icon: ReactNode;
  business_id: SVGStringList;
}

const PendingBadge: React.FC<PendingBadgeProps> = ({
  endpoint,
  icon,
  business_id,
}) => {
  const [pendingCount, setPendingCount] = useState<number>(0);
  const { businessId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (business_id) {
          const response = await axios.get<{ count: number }>(
            `${process.env.REACT_APP_BASE_URL_ADMIN}${endpoint}/${businessId}`
          );
          setPendingCount(response.data.count);
        } else {
          const response = await axios.get<{ count: number }>(
            `${process.env.REACT_APP_BASE_URL_ADMIN}${endpoint}`
          );
          setPendingCount(response.data.count);
        }
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    };

    fetchData();
  }, [endpoint, businessId, business_id]);

  return (
    <Badge badgeContent={pendingCount} color="secondary">
      {icon}
    </Badge>
  );
};

export default PendingBadge;
