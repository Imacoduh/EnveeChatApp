import * as React from "react"
import { useContext } from "react"
import Menu from "@mui/joy/Menu"
import MenuItem from "@mui/joy/MenuItem"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import MenuButton from "@mui/joy/MenuButton"
import Dropdown from "@mui/joy/Dropdown"
import Avatar from "@mui/joy/Avatar"
import { Box, Typography } from "@mui/joy"
import {
  CollectionsBookmarkRounded,
  LoginRounded,
  LogoutRounded,
  SettingsRounded
} from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { Routes } from "@/lib/constants"
import Divider from "@mui/joy/Divider"
import ThemeToggleButton from "@/components/ThemeToggle"
import { ChatbotUIContext } from "@/context/context"
import { supabase } from "@/lib/supabase/browser-client"
import { useAuthModal } from "@/lib/providers/AuthContextProvider"
import { useSnackbar } from "@/lib/providers/SnackbarProvider"

export default function ProfileMenu({
  placement = "bottom"
}: {
  placement?: "left" | "right" | "top" | "bottom"
}) {
  const router = useRouter()
  const { profile } = useContext(ChatbotUIContext)
  const { openAuthModal } = useAuthModal()
  const { setSnackbar } = useSnackbar()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    const message = error?.message ?? "You have been signed out"
    const color = error ? "danger" : "success"
    setSnackbar({ message: message, color: color })
    router.refresh()
  }

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: Avatar }}
        slotProps={{
          root: { variant: "solid", size: "sm" }
        }}
      >
        <Avatar variant="soft" size="sm" src={profile?.image_url} />
      </MenuButton>

      <Menu placement={placement} sx={{ width: "250px" }}>
        <Box sx={{ display: "flex", m: 1, mx: 1.5 }}>
          <Avatar variant="soft" src={profile?.image_url} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              pl: 1.5,
              overflow: "hidden",
              justifyContent: "center",
              justifyContentItems: "center"
            }}
          >
            <Typography
              level="body-lg"
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {(profile?.display_name || profile?.username) ?? "Guest"}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ m: 0.5 }} />
        <Box
          sx={{ display: "flex", my: 1, mx: 1.5, gap: 1, alignItems: "center" }}
        >
          <ThemeToggleButton />
          {/*{process.env.BUILD_MODE === 'export' && <FloatingWindowToggle />}*/}
        </Box>

        {/*<MenuItem*/}
        {/*  onClick={() => {*/}
        {/*    router.push(Routes.Collections)*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <ListItemDecorator>*/}
        {/*    <CollectionsBookmarkRounded />*/}
        {/*  </ListItemDecorator>*/}
        {/*  Collections*/}
        {/*</MenuItem>*/}

        {/*<MenuItem*/}
        {/*  onClick={() => {*/}
        {/*    router.push(Routes.Settings)*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <ListItemDecorator>*/}
        {/*    <SettingsRounded />*/}
        {/*  </ListItemDecorator>*/}
        {/*  Settings*/}
        {/*</MenuItem>*/}

        <Divider sx={{ m: 0.5 }} />
        {profile !== null && (
          <MenuItem onClick={handleSignOut}>
            <ListItemDecorator>
              <LogoutRounded />
            </ListItemDecorator>
            Logout
          </MenuItem>
        )}
        {profile === null && (
          <MenuItem onClick={() => openAuthModal()}>
            <ListItemDecorator>
              <LoginRounded />
            </ListItemDecorator>
            Login / Sign Up
          </MenuItem>
        )}
      </Menu>
    </Dropdown>
  )
}
