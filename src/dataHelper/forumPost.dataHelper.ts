export interface ForumPost {
    id: number;
    title: string;
    content: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    status: ForumPostStatus;
}

export interface ForumPostCreateParams {
    title: string;
    content: string;
    status: ForumPostStatus;
    topic_id: number[];
}

export enum ForumPostStatus {
    LOCAL = 'local',
    PENDING = 'pending',
    APPROVED = 'approved',
    INACTIVE = 'inactive',
    REJECTED = 'rejected',
    NEEDS_REVIEW = 'needs_review',
}

