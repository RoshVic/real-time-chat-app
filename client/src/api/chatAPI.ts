import { gql, type TypedDocumentNode } from "@apollo/client";

type FetchChatsQueryType = {
    getChatRooms: {
        id: string;
        roomname: string;
        createdAt: string;
    }[];
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
    createChatRoom: {
        id: string;
        roomname: string;
        createdAt: string;
    };
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
