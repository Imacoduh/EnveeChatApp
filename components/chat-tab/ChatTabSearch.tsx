import { ContentType } from "@/types"
import { FC } from "react"
import { Input } from "@mui/joy"
import { SearchRounded } from "@mui/icons-material"

interface SidebarSearchProps {
  contentType: ContentType
  searchTerm: string
  setSearchTerm: Function
}

export const ChatTabSearch: FC<SidebarSearchProps> = ({
  contentType,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <Input
      placeholder={`Search ${contentType}...`}
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      startDecorator={<SearchRounded />}
      sx={{ width: "100%" }}
    />
  )
}
