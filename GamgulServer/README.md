# 감귤서버
## npm
- cors
- express
- dotenv
- mongoose
- multer
- body-parser

## 유저
### 회원가입
- api
    - /user (post)

- req
    - Email (고유, 필수)
    - Password (필수)
    - UserName (필수)
    - accountname (?)
    - intro (소개)
    - image (default)
    
- res
    - "_id" : string
    - "username" : String
    - "acoountname : string
    - "email" : string 
    - "intro" : string
    - "image" : string
    - "hearts" : array (?)
    - "following" : array (?)
    - "follower" : array (?)
    - "followCount" : 0
  
- fail
    - email, password, accountname, username 중 하나라도 작성하지 않을 경우 필수 입력사항을 입력해주세요. 
    - password를 6자 이상 입력하지 않을 경우 비밀번호는 6자 이상이어야 합니다. 
    - eamil 형식이 잘못될 경우 잘못된 이메일 형식입니다. 
    - 가입된 email일 경우 이미 가입된 이메일 주소입니다. 
    - accountname에 지정된 문자 이외의 문자가 들어갈 경우 영문, 숫자, 밑줄, 마침표만 사용할 수 있습니다. 
    - 가입된 accountname일 경우 이미 사용중인 계정 ID입니다.
## 이미지
### 한개의 이미지
- api
    - /image/uploadfile (post)
- req
    - key: image
    - value: 이미지 파일
 
- res
    - "fieldname": "String",
	- "originalname": String,
	- "encoding": String,
	- "mimetype": String,
	- "destination": String,
	- "filename": String,
	- "path": String,
	- "size": number

- fail
    - 이미지 파일(*.jpg, *.gif, *.png, *.jpeg, *.bmp, *.tif) 확장자명이 다를 때
    - 이미지 파일만 업로드가 가능합니다.
### 여러개의 이미지
- api
    - /image/uploadfiles (post)
### 이미지 보고
- api
    - /filename.이미지 확장자
- res
    - 사진
- faile
    - status 404

### ~ing