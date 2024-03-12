import { gql } from "@apollo/client";

export const GET_CHAT_MESSAGES = gql`
  query {
    allMessages {
      id
      sender,
      message,
      timestamp,
    }
  }
`;

export const GET_MESSAGER_FILTER = gql`
  query ($sender: String!, $message: String!) {
    chatMessageFilter(sender: $sender, message: $message) {
      id,
      sender,
      message,
      timestamp,
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateChatMessage($createChatMessageObject: CreateChatMessageInput!) {
    createChatMessage(createChatMessageObject: $createChatMessageObject) {
      id
      sender,
      message,
      timestamp,
    }
  }
`;

export const EDIT_MESSAGE = gql`
  mutation EditChatMessage($editChatMessageObject: EditChatMessageInput!) {
    editChatMessage(editChatMessageObject: $editChatMessageObject) {
      id
      name
      username
      email
      password
      accessLevel
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation deleteChatMessage($deleteChatMessageId: String!) {
    deleteChatMessage(id: $deleteChatMessageId)
  }
`;
