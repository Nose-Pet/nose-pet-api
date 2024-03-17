/**
 * @api {post} /auth/signup 01. 유저 회원가입
 * @apiName UserSignup
 * @apiGroup Auth
 *
 * @apiBody {String} email 이메일
 * @apiBody {String} password 비밀번호</br>대소문자 및 숫자, 특수문자 포함 8~15자리
 * @apiBody {String} confirmPassword 비밀번호 확인
 * @apiBody {String} name 이름
 * @apiBody {String} nickname 닉네임
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 *
 * @apiUse NotMatchedPassword
 * @apiUse AlreadyUsedEmail
 * @apiUse InvalidEmailFormat
 * @apiUse InvalidPasswordFormat
 */

/**
 * @api {post} /auth/signin 02. 유저 로그인
 * @apiName UserSignin
 * @apiGroup Auth
 *
 * @apiBody {String} email 이메일
 * @apiBody {String} password 비밀번호
 *
 * @apiSuccess {String} accessToken 액세스 토큰
 * @apiSuccess {String} expiredDate 토큰 만료일
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 * {
 *   "accessToken": "eyJh...1_o",
 *   "expiredDate": "2024-04-16"
 * }
 *
 * @apiUse NotFoundUser
 * @apiUse InvalidEmailFormat
 * @apiuse InvalidPasswordFormat
 */
