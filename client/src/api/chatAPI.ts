import { gql, type TypedDocumentNode } from "@apollo/client";

type FetchChatsQueryType = {
    getChatRooms: {
        id: string;
        roomname: string;
        createdAt: string;
    };
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
