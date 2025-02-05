
# 웹페이지 사용 방법

# 세팅
1. vscode, nodejs, git 등을 설치
    - vscode : https://code.visualstudio.com/download
    - nodejs : https://nodejs.org/en/download/current
    - githttps://git-scm.com/downloads
2. 터미널(윈도우는 cmd)을 열고 다음 명령어를 순서대로 입력, 로그인 필요할 수 있음
    - 데스크탑으로 가자:  `cd Desktop`
    - 프로젝트를 내 컴퓨터에 복사: `git clone https://github.com/channelcrane/channelcrane.github.io`
    - 복사한 폴더로 가자: `cd channelcrane.github.io` 
    - 초기화: `npm install`
3. 기다리면 바탕화면에 channelcrane.github.io 폴더가 생김 원하는 위치에 옮기기

#  업데이트
1. vscode를 켜고 프로젝트를 열기 (`Open` 혹은 `Open Folder` 이용)
2. 컨텐츠를 추가하기 위해서 `data/blog/` 폴더 내에 mdx 파일을 추가하고 수정합니다.
3. 이미지를 추가할 경우에는 `public/static/images`안에 넣고, 경로를 복사해서 mdx 내 imagePaths에 추가합니다.
(참고: 유튜브 주소를 넣은 경우에는 github에 업로드한 후에만 제대로 보입니다)
4. 상단 메뉴에서 `Terminal` > `new terminal` 실행
5. `npm run dev`를 실행시켜서 문제가 없는지 확인합니다.
6. 또 새로운 terminal을 열고 `npm run build`을 실행시켜서 문제가 없는지 확인합니다.
7. 좌측 사이드바에서 source control을 선택하고, 수정 메시지를 쓴 후 commit을 누릅니다.
8. sync changes를 누릅니다 (이 과정이 처음인 경우 로그인이 필요할 수 있습니다).
9. 약 5분 정도 후에 github 페이지에서 수정 사항을 확인합니다. 문제가 있는 경우에 메일이 옵니다.

# 설치하면 유용한 플러그인
플러그인은 좌측에 Extensions 버튼을 누르면 나오는 검색창에 검색한 후, install 버튼을 눌러서 설치 가능
- MDX by unified
- Git Graph by mhutchie
