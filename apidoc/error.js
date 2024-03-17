/**
 * @apiDefine NotMatchedPassword
 *
 * @apiError NotMatchedPassword 비밀번호가 일치하지 않습니다.
 *
 * @apiErrorExample NotMatchedPassword:
 * HTTP/1.1 400 Bad Request
 * {
 *   "errorCode": "ERR_002_0008",
 *   "message": "비밀번호가 일치하지 않습니다."
 * }
 */

/**
 * @apiDefine NotFoundUser
 *
 * @apiError NotFoundUser 해당 계정 정보를 찾을 수 없습니다.
 *
 * @apiErrorExample NotFoundUser:
 * HTTP/1.1 400 Bad Request
 * {
 *   "errorCode": "ERR_002_0001",
 *   "message": "해당 계정 정보를 찾을 수 없습니다."
 * }
 */

/**
 * @apiDefine BlockedUser
 *
 * @apiError BlockedUser 이용에 제재를 당한 유저입니다.
 *
 * @apiErrorExample BlockedUser:
 * HTTP/1.1 400 Bad Request
 * {
 *   "errorCode": "ERR_002_0003",
 *   "message": "이용에 제재를 당한 유저입니다."
 * }
 */

/**
 * @apiDefine AlreadyUsedEmail
 *
 * @apiError AlreadyUsedEmail 해당 이메일은 이미 사용중입니다.
 *
 * @apiErrorExample AlreadyUsedEmail:
 * HTTP/1.1 400 Bad Request
 * {
 *   "errorCode": "ERR_002_0009",
 *   "message": "해당 이메일은 이미 사용중입니다."
 * }
 */

/**
 * @apiDefine InvalidEmailFormat
 *
 * @apiError InvalidEmailFormat 올바르지 않은 이메일 형식입니다.
 *
 * @apiErrorExample InvalidEmailFormat:
 * HTTP/1.1 400 Bad Request
 * {
 *   "errorCode": "ERR_001_0003",
 *   "message": "올바르지 않은 이메일 형식입니다."
 * }
 */

/**
 * @apiDefine InvalidPasswordFormat
 *
 * @apiError InvalidPasswordFormat 올바르지 않은 비밀번호 형식입니다.
 *
 * @apiErrorExample InvalidPasswordFormat:
 * HTTP/1.1 400 Bad Request
 * {
 *   "errorCode": "ERR_001_0004",
 *   "message": "올바르지 않은 비밀번호 형식입니다."
 * }
 */
