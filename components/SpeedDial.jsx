import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { IoIosPersonAdd } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa6";
import { useRouter } from "next/navigation"; // استخدام useRouter بدلاً من Link

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

const actions = [
  { icon: <IoIosPersonAdd />, name: "اضف مستخدم", path: "/add-user" },
  { icon: <FaCartArrowDown />, name: "اضف منتج", path: "/add-product" },
];

export default function PersistentSpeedDial() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter(); // استخدام router للتنقل

  return (
    <Box sx={{ position: "relative" }}>
      <StyledSpeedDial
        ariaLabel="SpeedDial with persistent actions"
        icon={<SpeedDialIcon />}
        direction="left"
        open={open}
        onClick={() => setOpen(!open)}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => router.push(action.path)}
          />
        ))}
      </StyledSpeedDial>
    </Box>
  );
}
