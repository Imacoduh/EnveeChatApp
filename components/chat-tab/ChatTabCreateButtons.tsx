import { useChatHandler } from "@/lib/hooks/use-chat-handler"
import { ChatbotUIContext } from "@/context/context"
import { createFolder } from "@/db/folders"
import { ContentType } from "@/types"
import { FC, useContext, useState } from "react"
import { CreateAssistant } from "../sidebar/items/assistants/create-assistant"
import { CreateCollection } from "../sidebar/items/collections/create-collection"
import { CreateFile } from "../sidebar/items/files/CreateFile"
import { CreatePreset } from "../sidebar/items/presets/create-preset"
import { CreatePrompt } from "../sidebar/items/prompts/CreatePrompt"
import { CreateTool } from "../sidebar/items/tools/create-tool"
import { CreateModel } from "../sidebar/items/models/create-model"
import { Box, Button, IconButton } from "@mui/joy"
import { AddRounded, CreateNewFolderRounded } from "@mui/icons-material"

interface SidebarCreateButtonsProps {
  contentType: ContentType
  hasData: boolean
  variant: "list" | "grid"
}

export const ChatTabCreateButtons: FC<SidebarCreateButtonsProps> = ({
  contentType,
  hasData,
  variant = "grid"
}) => {
  const { profile, selectedWorkspace, folders, setFolders } =
    useContext(ChatbotUIContext)
  const { handleNewChat } = useChatHandler()

  const [isCreatingPrompt, setIsCreatingPrompt] = useState(false)
  const [isCreatingPreset, setIsCreatingPreset] = useState(false)
  const [isCreatingFile, setIsCreatingFile] = useState(false)
  const [isCreatingCollection, setIsCreatingCollection] = useState(false)
  const [isCreatingAssistant, setIsCreatingAssistant] = useState(false)
  const [isCreatingTool, setIsCreatingTool] = useState(false)
  const [isCreatingModel, setIsCreatingModel] = useState(false)

  const contentTypeString =
    contentType.charAt(0).toUpperCase() +
    contentType.slice(1, contentType.length - 1)

  const handleCreateFolder = async () => {
    if (!profile) return
    if (!selectedWorkspace) return

    const createdFolder = await createFolder({
      user_id: profile.user_id,
      workspace_id: selectedWorkspace.id,
      name: "New Folder",
      description: "",
      type: contentType
    })
    setFolders([...folders, createdFolder])
  }

  const getCreateFunction = () => {
    switch (contentType) {
      case "chats":
        return async () => {
          handleNewChat()
        }

      case "presets":
        return async () => {
          setIsCreatingPreset(true)
        }

      case "prompts":
        return async () => {
          setIsCreatingPrompt(true)
        }

      case "files":
        return async () => {
          setIsCreatingFile(true)
        }

      case "collections":
        return async () => {
          setIsCreatingCollection(true)
        }

      case "assistants":
        return async () => {
          setIsCreatingAssistant(true)
        }

      case "tools":
        return async () => {
          setIsCreatingTool(true)
        }

      case "models":
        return async () => {
          setIsCreatingModel(true)
        }

      default:
        break
    }
  }

  return (
    <Box sx={{ display: "flex", flexShrink: 0, gap: 1 }}>
      {variant === "grid" ? (
        <>
          <Button
            variant="outlined"
            color="neutral"
            onClick={getCreateFunction()}
            startDecorator={<AddRounded />}
          >
            {`New ${contentTypeString}`}
          </Button>
        </>
      ) : (
        <>
          <IconButton variant="outlined" onClick={getCreateFunction()}>
            <AddRounded />
          </IconButton>
        </>
      )}

      {hasData && (
        <IconButton
          variant="outlined"
          color="neutral"
          onClick={handleCreateFolder}
        >
          <CreateNewFolderRounded />
        </IconButton>
      )}

      {isCreatingPrompt && (
        <CreatePrompt
          isOpen={isCreatingPrompt}
          onOpenChange={setIsCreatingPrompt}
        />
      )}

      {isCreatingPreset && (
        <CreatePreset
          isOpen={isCreatingPreset}
          onOpenChange={setIsCreatingPreset}
        />
      )}

      {isCreatingFile && (
        <CreateFile isOpen={isCreatingFile} onOpenChange={setIsCreatingFile} />
      )}

      {isCreatingCollection && (
        <CreateCollection
          isOpen={isCreatingCollection}
          onOpenChange={setIsCreatingCollection}
        />
      )}

      {isCreatingAssistant && (
        <CreateAssistant
          isOpen={isCreatingAssistant}
          onOpenChange={setIsCreatingAssistant}
        />
      )}

      {isCreatingTool && (
        <CreateTool isOpen={isCreatingTool} onOpenChange={setIsCreatingTool} />
      )}

      {isCreatingModel && (
        <CreateModel
          isOpen={isCreatingModel}
          onOpenChange={setIsCreatingModel}
        />
      )}
    </Box>
  )
}
