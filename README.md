
# 웹페이지 사용 방법

# 세팅
1. vscode, nodejs, git 등을 설치
2. 'git clone https://github.com/channelcrane/channelcrane.github.io'
3. vscode 열고, 상단 터미널 메뉴에서 새 터미널 열어서 `npm install`

#  업데이트
1. vscode를 켜고 프로젝트를 엽니다.
2. 컨텐츠를 추가하기 위해서 `data/blog/` 폴더안에 mdx 파일을 추가하고 수정합니다.
3. 이미지를 추가할 경우에는 `public/static/images`안에 넣고, 경로를 복사해서 mdx 파일에 추가합니다.
4. 상단 메뉴에서 new terminal 실행
5. `npm run dev`를 실행시켜서 문제가 없는지 확인합니다.
6. `npm run build`
7. 좌측 사이드바에서 source control을 선택하고, 수정 메시지를 쓴 후 commit 합니다.
8. sync changes를 누릅니다.
9. 약 5분 정도 후에 github 페이지에서 수정 사항을 확인합니다. 문제가 있는 경우에 메일이 옵니다.