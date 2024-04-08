export type VotesProps = {
    numUpvotes: number;
    message_id: string;
    message_type: string;
    handleVoteAction: (message_id: string, action: string) => void;
};