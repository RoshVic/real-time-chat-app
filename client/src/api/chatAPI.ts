import { gql, type TypedDocumentNode } from "@apollo/client";
import type { ChatMessage, ChatRoom } from "../types/chat";

type FetchChatsQueryType = {
    getChatRooms: ChatRoom[];
};

type FetchChatsQueryVariables = {};

export const FETCH_CHATS: TypedDocumentNode<FetchChatsQueryType, FetchChatsQueryVariables> = gql`
    query GetChatRooms {
        getChatRooms {
            id
            roomname
            createdAt
        }
    }
`;

type CreateChatQueryType = {
    createChatRoom: ChatRoom;
};

type CreateChatQueryVariables = {
    data: {
        roomname: string;
    };
};

export const CREATE_CHAT: TypedDocumentNode<CreateChatQueryType, CreateChatQueryVariables> = gql`
    mutation CreateChatRoom($data: ChatRoomInput!) {
        createChatRoom(data: $data) {
            id
            roomname
            createdAt
        }
    }
`;

type FetchMessagesQueryType = {
    getMessages: ChatMessage[];
};

type FetchMessagesQueryVariables = {
    data: {
        chatRoomId: string;
    };
};

export const FETCH_MESSAGES: TypedDocumentNode<FetchMessagesQueryType, FetchMessagesQueryVariables> = gql`
    query GetMessages($data: GetChatMessagesInput!) {
        getMessages(data: $data) {
            id
            text
            username
            createdAt
        }
    }
`;
