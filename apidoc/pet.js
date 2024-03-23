/**
 * @api {post} /pets 01. 펫 등록
 * @apiName CreatePet
 * @apiGroup Pet
 * @apiPermission User
 *
 * @apiBody {String} name 이름
 * @apiBody {String=MALE,FEMALE} gender 성별
 * @apiBody {Boolean} isNeutered 중성화 여부
 * @apiBody {String} birth 생년월일 (YYYY-MM-DD)
 * @apiBody {String} type 펫 종류</br>허용 가능한 펫 타입은 <b><i><a href='#api-Pet-GetPetTypeList'>'펫 타입 조회 api'</a></i></b> 를 통해 확인 가능
 * @apiBody {String} [image] 이미지 URL
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 201 Created
 *
 * @apiUse NotFoundPetType
 * @apiUse InvalidPetGender
 * @apiUse DuplicatedPet
 */

/**
 * @api {get} /pets/:petIdx 02. 특정 펫 상세 조회
 * @apiName GetPetDetail
 * @apiGroup Pet
 * @apiPermission User
 *
 * @apiParam {Number} petIdx 펫 idx
 *
 * @apiSuccess {Object} pet 펫 정보
 * @apiSuccess {Number} pet.idx 펫 idx
 * @apiSuccess {String} pet.name 이름
 * @apiSuccess {String=MALE,FEMALE} pet.gender 성별
 * @apiSuccess {Boolean} pet.isNeutered 중성화 여부
 * @apiSuccess {String} pet.birth 생년월일
 * @apiSuccess {String} pet.image 이미지 URL
 * @apiSuccess {String=ACTIVATED,DEACTIVATED,DELETED} pet.status 상태</br>ACTIVATED: 활성화, DEACTIVATED: 비활성화, DELETED: 삭제
 * @apiSuccess {String} pet.createdDate 생성일
 * @apiSuccess {String} pet.modifiedDate 수정일
 * @apiSuccess {Object} pet.petType 펫 타입
 * @apiSuccess {Number} pet.petType.idx 펫 타입 idx
 * @apiSuccess {String} pet.petType.name 펫 타입 이름
 * @apiSuccess {Object} pet.petNosePrint 펫 비문 정보</br>비문 정보가 없을 경우 null
 * @apiSuccess {Object} ownedUserPetGroupInfo 해당 펫을 소유한 그룹 정보
 * @apiSuccess {Number} ownedUserPetGroupInfo.idx 그룹 idx
 * @apiSuccess {String} ownedUserPetGroupInfo.name 그룹 이름
 * @apiSuccess {String=ACTIVATED,DEACTIVATED,DELETED} ownedUserPetGroupInfo.status 상태</br>ACTIVATED: 활성화, DEACTIVATED: 비활성화, DELETED: 삭제
 * @apiSuccess {String} ownedUserPetGroupInfo.createdDate 생성일
 * @apiSuccess {String} ownedUserPetGroupInfo.modifiedDate 수정일
 * @apiSuccess {Object} creatorInfo 펫을 생성한 유저 정보
 * @apiSuccess {Number} creatorInfo.idx 유저 idx
 * @apiSuccess {String} creatorInfo.email 이메일
 * @apiSuccess {String} creatorInfo.name 이름
 * @apiSuccess {String} creatorInfo.nickname 닉네임
 * @apiSuccess {String=ACTIVATED,DEACTIVATED,DELETED} creatorInfo.status 상태</br>ACTIVATED: 활성화, DEACTIVATED: 비활성화, DELETED: 삭제
 * @apiSuccess {String} creatorInfo.createdDate 생성일
 * @apiSuccess {String} creatorInfo.modifiedDate 수정일
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "pet": {
 *         "idx": 1,
 *         "name": "콩",
 *         "gender": "FEMALE",
 *         "isNeutered": true,
 *         "birth": "2023-04-01",
 *         "image": null,
 *         "status": "ACTIVATED",
 *         "createdDate": "2024-03-21T09:22:19.858Z",
 *         "modifiedDate": "2024-03-21T09:22:19.858Z",
 *         "petType": {
 *             "idx": 1,
 *             "name": "치와와"
 *         },
 *         "petNosePrint": null
 *     },
 *     "ownedUserPetGroupInfo": {
 *         "idx": 8,
 *         "name": "7123928823",
 *         "status": "ACTIVATED",
 *         "createdDate": "2024-03-16T06:43:17.226Z",
 *         "modifiedDate": "2024-03-16T06:43:17.226Z"
 *     },
 *     "creatorInfo": {
 *         "idx": 8,
 *         "email": "jiho5993@gmail.com",
 *         "name": "박지호",
 *         "nickname": "7123928823",
 *         "status": "ACTIVATED",
 *         "createdDate": "2024-03-16T06:43:17.248Z",
 *         "modifiedDate": "2024-03-16T06:43:17.248Z"
 *     }
 * }
 *
 * @apiUse NotFoundPet
 */

/**
 * @api {delete} /pets/:petIdx 03. 펫 삭제
 * @apiName DeletePet
 * @apiGroup Pet
 * @apiPermission User
 *
 * @apiParam {Number} petIdx 펫 idx
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 204 No Content
 *
 * @apiUse NotFoundPet
 */

/**
 * @api {put} /pets/:petIdx 04. 펫 정보 수정
 * @apiName ModifyPetInfo
 * @apiGroup Pet
 * @apiPermission User
 *
 * @apiParam {Number} petIdx 펫 idx
 *
 * @apiBody {String} [name] 이름
 * @apiBody {String=MALE,FEMALE} [gender] 성별
 * @apiBody {Boolean} [isNeutered] 중성화 여부
 * @apiBody {String} [birth] 생년월일 (YYYY-MM-DD)
 * @apiBody {String} [type] 펫 종류</br>허용 가능한 펫 타입은 <b><i><a href='#api-Pet-GetPetTypeList'>'펫 타입 조회 api'</a></i></b> 를 통해 확인 가능
 * @apiBody {String} [image] 이미지 URL
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 *
 * @apiUse NotFoundPet
 */

/**
 * @api {put} /pets 05. 펫 목록 조회
 * @apiName GetPetList
 * @apiGroup Pet
 * @apiPermission User
 *
 * @apiQuery {Number} [limit] 조회 개수
 * @apiQuery {Number} [offset] 조회 시작 위치
 * @apiQuery {String} [searchTerm] 검색어<br/>검색 가능 필드: 이름
 *
 * @apiSuccess {Object[]} list 펫 목록
 * @apiSuccess {Object} list.pet 펫 정보
 * @apiSuccess {Number} list.pet.idx 펫 idx
 * @apiSuccess {String} list.pet.name 이름
 * @apiSuccess {String=MALE,FEMALE} list.pet.gender 성별
 * @apiSuccess {Boolean} list.pet.isNeutered 중성화 여부
 * @apiSuccess {String} list.pet.birth 생년월일
 * @apiSuccess {String} list.pet.image 이미지 URL
 * @apiSuccess {String=ACTIVATED,DEACTIVATED,DELETED} list.pet.status 상태</br>ACTIVATED: 활성화, DEACTIVATED: 비활성화, DELETED: 삭제
 * @apiSuccess {String} list.pet.createdDate 생성일
 * @apiSuccess {String} list.pet.modifiedDate 수정일
 * @apiSuccess {Object} list.pet.petType 펫 타입
 * @apiSuccess {Number} list.pet.petType.idx 펫 타입 idx
 * @apiSuccess {String} list.pet.petType.name 펫 타입 이름
 * @apiSuccess {Object} list.pet.petNosePrint 펫 비문 정보</br>비문 정보가 없을 경우 null
 * @apiSuccess {Number} count 전체 개수
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "list": [
 *         {
 *             "idx": 1,
 *             "name": "콩",
 *             "gender": "FEMALE",
 *             "isNeutered": true,
 *             "birth": "2023-04-01",
 *             "image": null,
 *             "status": "ACTIVATED",
 *             "createdDate": "2024-03-21T09:22:19.858Z",
 *             "modifiedDate": "2024-03-21T09:22:19.858Z",
 *             "petType": {
 *                 "idx": 1,
 *                 "name": "치와와"
 *             },
 *             "petNosePrint": null
 *         },
 *         ...
 *     ],
 *     "count": 11
 * }
 */

/**
 * @api {get} /pet-types 06. 펫 타입 조회
 * @apiName GetPetTypeList
 * @apiGroup Pet
 *
 * @apiSuccess {Object[]} list 펫 타입
 * @apiSuccess {Number} list.idx 펫 타입 idx
 * @apiSuccess {String} list.name 펫 타입 이름
 *
 * @apiSuccessExample {json} Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "list": [
 *         {
 *             "idx": 1,
 *             "name": "치와와"
 *         },
 *         {
 *             "idx": 2,
 *             "name": "골든 리트리버"
 *         },
 *         ...
 *     ]
 * }
 */
