import { notifications } from "@mantine/notifications"
import { IconCheck, IconX, IconAlertTriangle } from "@tabler/icons-react"

export const notificationSuccess = (title, message) => {
  return notifications.show({
    title: title,
    message: message,
    withCloseButton: true,
    withBorder: true,
    icon: <IconCheck size='1.1rem' />,
    color: 'teal'
  })
}

export const notificationError = (title, message) => {
  return notifications.show({
    title: title,
    message: message,
    withCloseButton: true,
    withBorder: true,
    icon: <IconX size='1.1rem' />,
    color: 'red'
  })
}

export const notificationWarning = (title, message) => {
  return notifications.show({
    title: title,
    message: message,
    withCloseButton: true,
    withBorder: true,
    icon: <IconAlertTriangle size='1.1rem' />,
    color: 'yellow'
  })
}