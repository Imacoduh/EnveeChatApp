import { Box, Modal, ModalDialog, Typography } from "@mui/joy"
import { ChatFile, MessageImage } from "@/types"
import { Tables } from "@/supabase/types"
import { FC } from "react"
import Image from "next/image"
import { DrawingCanvas } from "@/components/utility/drawing-canvas"
import { InsertDriveFileRounded } from "@mui/icons-material"

interface FilePreviewProps {
  type: "image" | "file" | "file_item"
  item: ChatFile | MessageImage | Tables<"file_items">
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const FilePreview: FC<FilePreviewProps> = ({
  type,
  item,
  isOpen,
  onOpenChange
}) => {
  return (
    <Modal open={isOpen} onClose={() => onOpenChange(false)}>
      <ModalDialog
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {type === "image" ? (
          (item as MessageImage).file ? (
            <DrawingCanvas imageItem={item as MessageImage} />
          ) : (
            <Image
              className="rounded"
              src={(item as MessageImage).base64 || (item as MessageImage).url}
              alt="File image"
              width={2000}
              height={2000}
              style={{
                maxHeight: "67vh",
                maxWidth: "67vw"
              }}
            />
          )
        ) : type === "file_item" ? (
          <Box
            sx={{
              borderRadius: 2,
              minWidth: 700,
              overflow: "auto",
              whiteSpace: "pre-wrap"
            }}
          >
            <Typography>{(item as Tables<"file_items">).content}</Typography>
          </Box>
        ) : (
          <Box
            sx={{
              borderRadius: 2,
              p: 2
            }}
          >
            <InsertDriveFileRounded />
          </Box>
        )}
      </ModalDialog>
    </Modal>
  )
}
