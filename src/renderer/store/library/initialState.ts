import { Book } from "@prisma/client";

type Status = "NOT_FETCHED" | "FETCHING" | "FETCHED" | "ERRORED";

export type LibraryState = {
    status: Status;
    data: {
        books: Book[];
    };
};

const initialState: LibraryState = {
    status: "NOT_FETCHED",
    data: {
        books: [],
    },
};

export default initialState;
