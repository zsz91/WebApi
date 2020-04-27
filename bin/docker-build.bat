@echo off
cd ../
call npm run build
cd ./docker
call del /f /q dist
call rmdir /s /q dist
call mkdir dist
call xcopy ..\dist dist /s /e
call docker stop app-yx-mobile
call docker container rm app-yx-mobile
call docker rmi -f dxg/app-yx-mobile
call docker build -t dxg/app-yx-mobile .
pause