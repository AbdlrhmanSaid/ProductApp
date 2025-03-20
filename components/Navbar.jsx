"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/store/slices/userSlice";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const settings = [{ label: "الملف الشخصي", link: "/profile" }];

function ResponsiveAppBar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const reduxUser = useSelector((state) => state.user.userData);
  const [user, setUser] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  useEffect(() => {
    setUser(reduxUser);
  }, [reduxUser]);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const signOut = () => {
    handleCloseUserMenu();
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

          {user === null ? null : !user ? (
            <Button className="bg-white" component={Link} href="/login">
              تسجيل الدخول
            </Button>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="الإعدادات">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.username || "User"}
                    src={user.avatar || ""}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user?._id &&
                  settings.map((setting, index) => (
                    <MenuItem
                      key={index}
                      onClick={handleCloseUserMenu}
                      component={Link}
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
