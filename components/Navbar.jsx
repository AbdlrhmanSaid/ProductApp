"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setUser } from "@/store/slices/userSlice";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Image from "next/image";
import Link from "next/link";

const settings = [
  {
    label: "Profile",
    link: "/profile",
  },
];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.userData);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user_data");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signOut = () => {
    sessionStorage.removeItem("user_data");
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Link href="/">
              <Image src="/favicon.png" width={100} height={50} alt="Logo" />
            </Link>
          </Box>

          {!user || !user.email ? (
            <Button className="bg-white" component={Link} href="/login">
              تسجيل الدخول
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.username || "User"}
                    src={user.avatar || ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user &&
                  user._id &&
                  settings.map((setting, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleCloseUserMenu}
                      component="a"
                      href={`${setting.link}/${user._id}`}
                    >
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  ))}

                <MenuItem onClick={signOut}>
                  <Typography textAlign="center" color="error">
                    تسجيل الخروج
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
