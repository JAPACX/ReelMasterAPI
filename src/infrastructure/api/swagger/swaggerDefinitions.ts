/**
 * @swagger
 * tags:
 *  name: Videos
 *  description: Endpoints related to videos and users
 */

/**
 * @swagger
 * /videos:
 *  get:
 *    summary: Get all videos
 *    tags: [Videos]
 *    responses:
 *      200:
 *        description: OK
 */

/**
 * @swagger
 * /videos/{userId}:
 *  get:
 *    summary: Get videos from a specific user
 *    tags: [Videos]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 */

/**
 * @swagger
 * /login:
 *  post:
 *    summary: User login
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register a new user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /videos/{userId}/{videoId}:
 *  delete:
 *    summary: Delete a user's video
 *    tags: [Videos]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: videoId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /videos/{userId}/{videoId/comments}:
 *  post:
 *    summary: Add a comment to a video
 *    tags: [Videos]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: videoId
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 * /videos/{userId}/{videoId/likes}:
 *  post:
 *    summary: Like or dislike a video
 *    tags: [Videos]
 *    parameters:
 *      - in: path
 *        name: userId
 *        required: true
 *        schema:
 *          type: string
 *      - in: path
 *        name: videoId
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */
