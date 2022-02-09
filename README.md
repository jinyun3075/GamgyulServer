# 감귤서버 API
## 실행 방법
- GamgulServer 폴더로 이동한다.
- npm i cors express dotenv mongoose multer body-parser bcrypt jsonwebtoken 를 입력하여 패키지를 다운받는다.
- npm start 를 입력하여 서버 실행
## 목차
[1. 유저](#유저)

- [1.1 회원가입](#회원가입)

- [1.2 로그인](#로그인)

- [1.3 전체 유저](#전체-유저)

[2. 이미지](#이미지)

- [2.1 이미지 업로드](#이미지-업로드)

- [2.2 여러 이미지 업로드](#여러-이미지-업로드)

- [2.2 이미지 자세히 보기](#이미지-자세히-보기)

[3. 프로필](#프로필)

- [3.1 프로필 수정](#프로필-수정)

- [3.2 개인 프로플](#개인-프로필)

- [3.3 팔로우](#팔로우)

- [3.4 언팔로우](#언팔로우)

- [3.5 팔로잉 리스트](#팔로잉-리스트)

- [3.6 팔로워 리스트](#팔로워-리스트)

[4. 댓글](#댓글)

- [4.1 댓글 작성](#댓글-작성)

[5. 게시글](#게시글)

- [5.1 게시글 작성](#게시글-작성)

- [5.2 팔로워 게시글 목록(피드)](#팔로워-게시글-목록(피드))

- [5.3 나의 게시글 목록](#나의-게시글-목록)

- [5.4 게시글 상세](#게시글-상세)

- [5.5 게시글 수정](#게시글-수정)
- [5.6 게시글 삭제](#게시글-삭제)

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
### 이미지 업로드
- api
    - /image/uploadfile (post)
- headers
    - apl
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
### 여러 이미지 업로드
- api
    - /image/uploadfiles (post)
- req
    - key: images
    - value: 이미지 파일
    
- fail
    - 이미지 최대 3개
    - 이미지 파일만 업로드
### 이미지 자세히 보기
- api
    - /filename.이미지 확장자
- res
    - 사진
- fail
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
## 검색
### 유저 검색
- api
    - /user/searchuser/?keyword=keyword
- headers
    - Authorization: Bearer key
	- Content-type: application/json
- res
    - id: String
    - username: String
    - accountname: String
    - following: []
    - follower: []
    - followerCount: Number
    - followingCount: Number
## 게시글
### 게시글 작성
- api
    - /post (post)
- headers
    - Authorization: Bearer key
	- Content-type: application/json
- req
    - post
        - content : String
        - image : [""]
- res
    - post
        - id : String
        - content : String
        - image : String
        - createdAt : String
        - updatedAt : String
        - hearted : False
        - heartCount : Number
        - commentCount : Number
        - author
            - id : String
            - username : String
            - accountname : String
            - following : []
            - follower : []
            - followerCount : Number
            - followingCount : Number
- fail
    - 내용 또는 이미지를 입력하지 않았을 떄


### 팔로워 게시글 목록(피드)
- api
    - /post/feed (get)
    - /post/feed/?limit=Number&skip=Number (get)

- headers
    - Authorization: Bearer key
	- Content-type: application/json

- res
    - 팔로워한 사용자가 있을때
    - post
        - id : String
        - content : String
        - image : []
        - createdAt : String
        - updatedAt : String
        - hearted : False
        - heartCount : Number
        - commentCount : Number
        - author
            - id : String
            - username : String
            - accountname : String
            - following : []
            - follower : []
            - followerCount : Number
            - followingCount : Number
- fail
    - follow 한 사용자가 없을 때
    - post : []

### 나의 게시글 목록
- api
    - /post/:accountname/userpost (get)
    - /post/:accountname/userpost/?limit=Number&skip=Number (get)

- headers
    - Authorization: Bearer key
	- Content-type: application/json

- res
    - post
        - id : String
        - content : String
        - image : []
        - createdAt : String
        - updatedAt : String
        - hearted : false
        - heartCount : Number
        - commentCount : Number
        - author
            - id : String
            - username : String
            - accountname : String
            - following : []
            - follower : []
            - followerCount : Number
            - followingCount : Number
    
    - 해당 계정의 게시물이 존재하지 않을 떄
        - post: []
    
- fail
    - 해당 계정이 존재하지 않습니다.

### 게시글 상세

- api
    - /post/:post_id (get)

- headers
    - Authorization: Bearer key
	- Content-type: application/json

- res
    - post
        - id: String
        - content: String
        - image: []
        - createdAt: String
        - updatedAt: String
        - heartCount : Number
        - commentCount : Number
        - author
            - id : String
            - username : String
            - accountname : String
            - following : []
            - follower : []
            - followerCount : Number
            - followingCount : Number
    
- fail
    - 게시글이 존재하지 않습니다.

### 게시글 수정
- api
    - /post/:post_id (put)

- headers
    - Authorization: Bearer key
	- Content-type: application/json

- req
    - post
        - content: String
        - image: []

- res
    - post
        - id : String
        - content : String
        - image : []
        - createdAt : String
        - updatedAt : String
        - hearted : false
        - heartCount : Number
        - commentCount : Number
        - author
            - id : String
            - username : String
            - accountname : String
            - following : []
            - follower : []
            - followerCount : Number
            - followingCount : Number
- fail
    - 존재하지 않는 게시글입니다.
    - 잘못된 요청입니다. 로그인 정보를 확인하세요. ( 다른 사용자가 해당 게시물을 수정할 경우)

### 게시글 삭제
- api
    - /post/:post_id (delete)

- headers
    - Authorization: Bearer key
	- Content-type: application/json

- res
    - 삭제되었습니다.

- fail
    - 존재하지 않는 게시글입니다.
    - 잘못된 요청입니다. 로그인 정보를 확인하세요. ( 다른 사용자가 해당 게시물을 수정할 경우)