import React, { useEffect, useState, ReactNode } from "react";
import Badge from "@mui/material/Badge";
import axios from "axios";
import { BASE_URL_ADMIN } from "@/constants";

interface PendingBadgeProps {
  endpoint: string;
  icon: ReactNode;
}

const PendingBadge: React.FC<PendingBadgeProps> = ({ endpoint, icon }) => {
  const [pendingCount, setPendingCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ count: number }>(
          `${BASE_URL_ADMIN}${endpoint}`
        );
        setPendingCount(response.data.count);
      } catch (error) {
        console.error("Error fetching pending count:", error);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <Badge badgeContent={pendingCount} color="secondary">
      {icon}
    </Badge>
  );
};

export default PendingBadge;
