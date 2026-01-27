import { gql, type TypedDocumentNode } from "@apollo/client";

type registerMutationType = {
    register: {
        accessToken: string;
        username: string;
    };
};

type registerMutationVariables = {
    data: {
        email: string;
        password: string;
        name: string;
    };
};

export const REGISTER_USER: TypedDocumentNode<registerMutationType, registerMutationVariables> = gql`
    mutation RegisterUser($data: RegisterInput!) {
        register(data: $data) {
            accessToken
            username
        }
    }
`;

type loginMutationType = {
    login: {
        accessToken: string;
        username: string;
    };
};

type loginMutationVariables = {
    data: {
        email: string;
        password: string;
    };
};

export const LOGIN_USER: TypedDocumentNode<loginMutationType, loginMutationVariables> = gql`
    mutation LoginUser($data: LoginInput!) {
        login(data: $data) {
            accessToken
            username
        }
    }
`;

type logoutMutationType = {
    logout: {
        logout: boolean;
    };
};

type logoutMutationVariables = {};

export const LOGOUT_USER: TypedDocumentNode<logoutMutationType, logoutMutationVariables> = gql`
    mutation Logout {
        logout
    }
`;
