export class Video {
  constructor(
    public video_id?: string,
    public title?: string,
    public description?: string,
    public credits?: string,
    public publish_date?: Date,
    public is_public?: boolean,
    public user_id?: string,
    public comments?: Comment[],
    public likes?: Like[]
  ) {}
}

export class Comment {
  constructor(
    public comment_id?: string,
    public content?: string,
    public user_id?: string,
    public video_id?: string,
    public created_at?: Date
  ) {}
}

export class Like {
  constructor(
    public like_id?: string,
    public user_id?: string,
    public video_id?: string,
    public is_like?: boolean,
    public created_at?: Date
  ) {}
}
