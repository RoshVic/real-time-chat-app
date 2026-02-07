import { gql, type TypedDocumentNode } from "@apollo/client";

type registerMutationType = {
    register: {
        accessToken: string;
    };
};

type registerMutationVariables = {
    data: {
        email: string;
        password: string;
        username: string;
    };
};

export const REGISTER_USER: TypedDocumentNode<registerMutationType, registerMutationVariables> = gql`
    mutation RegisterUser($data: RegisterInput!) {
        register(data: $data) {
            accessToken
        }
    }
`;

type loginMutationType = {
    login: {
        accessToken: string;
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
