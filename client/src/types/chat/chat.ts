import { MessageType } from "./message/message";

export type MessageWithVotesProps = {
    numUpvotes: number;
    message_id: string;
    msg: MessageType;
    message_type: string;
    handleVoteAction: (message_id: string, action: string) => void;
};

export type VoteUpdateProps = {
    user: {
        user_id: string;
        upvoted_message_ids: string[];
        downvoted_message_ids: string[];
    };
    message: {
        id: string;
        num_upvotes: number;
    }
}