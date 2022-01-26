# 감귤서버
## npm
- cors
- express
- dotenv
- mongoose
- multer
- body-parser
- bcrypt
- jsonwebtoken

## 유저
### 회원가입
- api
    - /user (post)

- req
    - user
        - username: String
        - email: String
        - password: String
        - accountname: String
        - intro: String
        - image: String
- res
    - user
        - _id: String
        - username: String
        - email: String
        - accountname: String
        - intro: String
        - image: String
- fail
    - email, password, accountname, username 중 하나라도 작성하지 않을 경우 필수 입력사항을 입력해주세요. 
    - password를 6자 이상 입력하지 않을 경우 비밀번호는 6자 이상이어야 합니다. 
    - eamil 형식이 잘못될 경우 잘못된 이메일 형식입니다. 
    - 가입된 email일 경우 이미 가입된 이메일 주소입니다. 
    - accountname에 지정된 문자 이외의 문자가 들어갈 경우 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다. 
    - 가입된 accountname일 경우 이미 사용중인 계정 ID입니다.

### 로그인
- api 
    - /user/login (post)
- req
    - user
        - email: String
        - password: String
- res
    - user
        - _id: String,
        - username: String
        - email: String
        - accountname: String
        - image: String
        - token: String
- fail
    - 이메일 또는 비밀번호를 입력하지 않을때
### 전체 유저
- api
    - /user (get)
- res
    - user
        - _id: String
        - email: String
        - hearts: []
        - following: []
        - follower: []
        - password: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
## 이미지
### 한개의 이미지
- api
    - /image/uploadfile (post)
- req
    - key: image
    - value: 이미지 파일
 
- res
    - fieldname: String
	- originalname: String
	- encoding: String
	- mimetype: String
	- destination: String
	- filename: String
	- path: String
	- size: number

- fail
    - 이미지 파일(*.jpg, *.gif, *.png, *.jpeg, *.bmp, *.tif) 확장자명이 다를 때
    - 이미지 파일만 업로드가 가능합니다.
### 여러개의 이미지
- api
    - /image/uploadfiles (post)
### 이미지 자세히 보기
- api
    - /filename.이미지 확장자
- res
    - 사진
- faile
    - status 404

## 프로필
### 프로필 수정
- api
    - /user (put)
- req
    - user
        - username: String
        - accountname: String
        - intro: String
        - image: String

- headers
    - "Authorization" : “Bearer key”
	- "Content-type" : application/json

- res
    - user
        - _id: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
        - following: []
        - follower: []
        - followerCount: Number
        - followingCount: Number
    }
### 개인 프로필
- api
    - /profile/:accountname (get)

- headers
    - Authorization : “Bearer key”
	- Content-type : "application/json"

- res
    - profile
        - _id: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
        - isfollow: Boolean
        - following: []
        - follower: []
        - followerCount: Number
        - followingCount: Number
    }

- fail
    - 해당 계정이 존재하지 않습니다.

### 팔로우
- api
    - /profile/:accountname/follow (post)
- headers
    - Authorization : Bearer key
	- Content-type : application/json
- res
    - follow 한 사용자의 프로필
    - profile
        - _id: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
		- isfollow: Boolean
        - following: []
        - follower: ["접속한 사용자의 id"]
        - followerCount: 1
        - followingCount: 0
    }
    
    - 접속한 사용자의 프로필
    - profile
        - _id: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
		- isfollow: Boolean
        - following: ["팔로우 한 사용자의 id"]
        - follower: []
        - followerCount: 0
        - followingCount: 1
    }
- fail
    - 해당 계정이 존재하지 않습니다.
### 언팔로우
- api
    - /profile/:accountname/unfollow (delete)
- headers
    - Authorization : Bearer key
	- Content-type : application/json
- res
    - follow 한 사용자의 프로필
    - profile
        - _id: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
		- isfollow: Boolean
        - following: []
        - follower: []
        - followerCount: 0
        - followingCount: 0
    
    - 접속한 사용자의 프로필
    - profile
        - _id: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
		- isfollow: Boolean
        - following: []
        - follower: []
        - followerCount: 0
        - followingCount: 0
    }
- fail
    - 해당 계정이 존재하지 않습니다.

### 팔로잉 리스트
- api
    - /profile/:accountname/following (get)
    - /profile/:accountname/following?limit=Number&skip=Number (get)
- headers
    - Authorization: Bearer key
	- Content-type: application/json
- res
    - []
        - _id: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
		- isfollow: Boolean
        - following: []
        - follower: ["접속한 사용자의 id"]
        - followerCount: 1
        - followingCount: 0
- fail
    - 해당 계정이 존재하지 않습니다.

### 팔로워 리스트
- api
    - /profile/:accountname/follower (get)
    - /profile/:accountname/follower/?limit=Number&skip=Number (get)
- headers
    - Authorization: Bearer key
	- Content-type: application/json
- res
    - []
        - _id: String
        - username: String
        - accountname: String
        - intro: String
        - image: String
		- isfollow: Boolean
        - following: []
        - follower: ["접속한 사용자의 id"]
        - followerCount: 1
        - followingCount: 0
- fail
    - 해당 계정이 존재하지 않습니다.